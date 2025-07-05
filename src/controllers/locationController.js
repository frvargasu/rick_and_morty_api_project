const rickAndMortyService = require('../services/rickAndMortyService');

class LocationController {
  // Get all locations with pagination
  async getAllLocations(req, res, next) {
    try {
      const { page = 1 } = req.query;
      
      // Validate page number
      if (page < 1 || isNaN(page)) {
        return res.status(400).json({ error: 'Invalid page number' });
      }

      const data = await rickAndMortyService.getAllLocations(parseInt(page));

      if (!data) {
        return res.status(404).json({ error: 'No locations found' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // Get location by ID
  async getLocationById(req, res, next) {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!id || isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid location ID' });
      }

      const location = await rickAndMortyService.getLocationById(parseInt(id));
      
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }

      res.json(location);
    } catch (error) {
      next(error);
    }
  }

  // Search locations by name
  async searchLocationsByName(req, res, next) {
    try {
      const { name } = req.params;
      
      if (!name || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name parameter is required' });
      }

      const data = await rickAndMortyService.searchLocationsByName(name.trim());
      
      if (!data) {
        return res.status(404).json({ error: 'No locations found with that name' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LocationController();