const rickAndMortyService = require('../services/rickAndMortyService');

class EpisodeController {
  // Get all episodes with pagination
  async getAllEpisodes(req, res, next) {
    try {
      const { page = 1 } = req.query;
      
      // Validate page number
      if (page < 1 || isNaN(page)) {
        return res.status(400).json({ error: 'Invalid page number' });
      }

      const data = await rickAndMortyService.getAllEpisodes(parseInt(page));

      if (!data) {
        return res.status(404).json({ error: 'No episodes found' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  // Get episode by ID
  async getEpisodeById(req, res, next) {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!id || isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid episode ID' });
      }

      const episode = await rickAndMortyService.getEpisodeById(parseInt(id));
      
      if (!episode) {
        return res.status(404).json({ error: 'Episode not found' });
      }

      res.json(episode);
    } catch (error) {
      next(error);
    }
  }

  // Get episodes by season
  async getEpisodesBySeason(req, res, next) {
    try {
      const { season } = req.params;
      
      // Validate season
      if (!season || isNaN(season) || season < 1 || season > 10) {
        return res.status(400).json({ error: 'Invalid season number (1-10)' });
      }

      const data = await rickAndMortyService.getEpisodesBySeason(parseInt(season));
      
      if (!data || !data.results || data.results.length === 0) {
        return res.status(404).json({ error: 'No episodes found for that season' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EpisodeController();