const axios = require('axios');
const cacheService = require('./cacheService');

class RickAndMortyService {
  constructor() {
    this.baseURL = process.env.RICK_AND_MORTY_API_URL || 'https://rickandmortyapi.com/api';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });
  }

  // Generic method to fetch data with caching
  async fetchData(endpoint, cacheKey = null) {
    try {
      // Check cache first if cacheKey is provided
      if (cacheKey) {
        const cachedData = await cacheService.get(cacheKey);
        if (cachedData) {
          return cachedData;
        }
      }

      const response = await this.api.get(endpoint);
      const data = response.data;

      // Cache the data if cacheKey is provided
      if (cacheKey) {
        await cacheService.set(cacheKey, data);
      }

      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  // Character methods
  async getAllCharacters(page = 1, name = null, status = null, species = null, gender = null) {
    let endpoint = `/character?page=${page}`;
    
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (status) params.append('status', status);
    if (species) params.append('species', species);
    if (gender) params.append('gender', gender);
    
    if (params.toString()) {
      endpoint += `&${params.toString()}`;
    }

    const cacheKey = `characters:${endpoint}`;
    return await this.fetchData(endpoint, cacheKey);
  }

  async getCharacterById(id) {
    const cacheKey = `character:${id}`;
    return await this.fetchData(`/character/${id}`, cacheKey);
  }

  async searchCharactersByName(name) {
    const cacheKey = `characters:search:${name}`;
    return await this.fetchData(`/character?name=${name}`, cacheKey);
  }

  // Episode methods
  async getAllEpisodes(page = 1) {
    const cacheKey = `episodes:page:${page}`;
    return await this.fetchData(`/episode?page=${page}`, cacheKey);
  }

  async getEpisodeById(id) {
    const cacheKey = `episode:${id}`;
    return await this.fetchData(`/episode/${id}`, cacheKey);
  }

  async getEpisodesBySeason(season) {
    const cacheKey = `episodes:season:${season}`;
    return await this.fetchData(`/episode?episode=S${season.toString().padStart(2, '0')}`, cacheKey);
  }

  // Location methods
  async getAllLocations(page = 1) {
    const cacheKey = `locations:page:${page}`;
    return await this.fetchData(`/location?page=${page}`, cacheKey);
  }

  async getLocationById(id) {
    const cacheKey = `location:${id}`;
    return await this.fetchData(`/location/${id}`, cacheKey);
  }

  async searchLocationsByName(name) {
    const cacheKey = `locations:search:${name}`;
    return await this.fetchData(`/location?name=${name}`, cacheKey);
  }
}

module.exports = new RickAndMortyService();