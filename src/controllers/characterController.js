const rickAndMortyService = require('../services/rickAndMortyService');

class CharacterController {
  // Get all characters with optional filtering and pagination
  async getAllCharacters(req, res, next) {
    try {
      const { page = 1, name, status, species, gender } = req.query;
      
      // Validate page number
      if (page < 1 || isNaN(page)) {
        return res.status(400).json({ error: 'Invalid page number' });
      }

      const data = await rickAndMortyService.getAllCharacters(
        parseInt(page),
        name,
        status,
        species,
        gender
      );

      if (!data) {
        return res.status(404).json({ error: 'No characters found' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // Get character by ID
  async getCharacterById(req, res, next) {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!id || isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid character ID' });
      }

      const character = await rickAndMortyService.getCharacterById(parseInt(id));
      
      if (!character) {
        return res.status(404).json({ error: 'Character not found' });
      }

      res.json(character);
    } catch (error) {
      next(error);
    }
  }

  // Search characters by name
  async searchCharactersByName(req, res, next) {
    try {
      const { name } = req.params;
      
      if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name parameter is required' });
      }

      const data = await rickAndMortyService.searchCharactersByName(name.trim());
      
      if (!data) {
        return res.status(404).json({ error: 'No characters found with that name' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // Filter characters
  async filterCharacters(req, res, next) {
    try {
      const { status, species, gender, page = 1 } = req.query;
      
      if (!status && !species && !gender) {
        return res.status(400).json({ 
          error: 'At least one filter parameter is required (status, species, or gender)' 
        });
      }

      const data = await rickAndMortyService.getAllCharacters(
        parseInt(page),
        null,
        status,
        species,
        gender
      );

      if (!data) {
        return res.status(404).json({ error: 'No characters found with those filters' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CharacterController();