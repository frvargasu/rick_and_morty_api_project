const rickAndMortyService = require('../../src/services/rickAndMortyService');

describe('Rick and Morty Service', () => {
  describe('getAllCharacters', () => {
    it('should fetch characters from API', async () => {
      const result = await rickAndMortyService.getAllCharacters(1);
      
      expect(result).toBeDefined();
      expect(result.info).toBeDefined();
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
    });

    it('should handle filtering parameters', async () => {
      const result = await rickAndMortyService.getAllCharacters(1, 'rick', 'alive');
      
      expect(result).toBeDefined();
      if (result && result.results) {
        expect(Array.isArray(result.results)).toBe(true);
      }
    });
  });

  describe('getCharacterById', () => {
    it('should fetch a character by ID', async () => {
      const result = await rickAndMortyService.getCharacterById(1);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBeDefined();
    });

    it('should return null for non-existent character', async () => {
      const result = await rickAndMortyService.getCharacterById(99999);
      
      expect(result).toBeNull();
    });
  });

  describe('getAllEpisodes', () => {
    it('should fetch episodes from API', async () => {
      const result = await rickAndMortyService.getAllEpisodes(1);
      
      expect(result).toBeDefined();
      expect(result.info).toBeDefined();
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
    });
  });

  describe('getEpisodeById', () => {
    it('should fetch an episode by ID', async () => {
      const result = await rickAndMortyService.getEpisodeById(1);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBeDefined();
    });
  });

  describe('getAllLocations', () => {
    it('should fetch locations from API', async () => {
      const result = await rickAndMortyService.getAllLocations(1);
      
      expect(result).toBeDefined();
      expect(result.info).toBeDefined();
      expect(result.results).toBeDefined();
      expect(Array.isArray(result.results)).toBe(true);
    });
  });

  describe('getLocationById', () => {
    it('should fetch a location by ID', async () => {
      const result = await rickAndMortyService.getLocationById(1);
      
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBeDefined();
    });
  });
});