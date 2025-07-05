const request = require('supertest');
const app = require('../../src/app');

describe('Character Controller', () => {
  describe('GET /api/characters', () => {
    it('should return a list of characters', async () => {
      const response = await request(app)
        .get('/api/characters')
        .expect(200);

      expect(response.body).toHaveProperty('info');
      expect(response.body).toHaveProperty('results');
      expect(Array.isArray(response.body.results)).toBe(true);
    });

    it('should return characters for a valid page', async () => {
      const response = await request(app)
        .get('/api/characters?page=1')
        .expect(200);

      expect(response.body).toHaveProperty('info');
      expect(response.body).toHaveProperty('results');
    });

    it('should return 400 for invalid page number', async () => {
      const response = await request(app)
        .get('/api/characters?page=0')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/characters/:id', () => {
    it('should return a character by valid ID', async () => {
      const response = await request(app)
        .get('/api/characters/1')
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body.id).toBe(1);
    });

    it('should return 400 for invalid ID', async () => {
      const response = await request(app)
        .get('/api/characters/invalid')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 404 for non-existent character', async () => {
      const response = await request(app)
        .get('/api/characters/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/characters/search/:name', () => {
    it('should return characters matching the search name', async () => {
      const response = await request(app)
        .get('/api/characters/search/rick')
        .expect(200);

      expect(response.body).toHaveProperty('results');
      expect(Array.isArray(response.body.results)).toBe(true);
    });

    it('should return 400 for empty search name', async () => {
      const response = await request(app)
        .get('/api/characters/search/ ')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/characters/filter', () => {
    it('should filter characters by status', async () => {
      const response = await request(app)
        .get('/api/characters/filter?status=alive')
        .expect(200);

      expect(response.body).toHaveProperty('results');
      expect(Array.isArray(response.body.results)).toBe(true);
    });

    it('should return 400 when no filter parameters provided', async () => {
      const response = await request(app)
        .get('/api/characters/filter')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});