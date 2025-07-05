const express = require('express');
const episodeController = require('../controllers/episodeController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Episode:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The episode ID
 *         name:
 *           type: string
 *           description: The episode's name
 *         air_date:
 *           type: string
 *           description: The episode's air date
 *         episode:
 *           type: string
 *           description: The episode code (e.g., S01E01)
 *         characters:
 *           type: array
 *           items:
 *             type: string
 *           description: List of characters in this episode
 *         url:
 *           type: string
 *           description: The episode's URL
 *         created:
 *           type: string
 *           description: When the episode was created
 */

/**
 * @swagger
 * /api/episodes:
 *   get:
 *     summary: Get all episodes
 *     tags: [Episodes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of episodes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     next:
 *                       type: string
 *                     prev:
 *                       type: string
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Episode'
 *       404:
 *         description: No episodes found
 */
router.get('/', episodeController.getAllEpisodes);

/**
 * @swagger
 * /api/episodes/season/{season}:
 *   get:
 *     summary: Get episodes by season
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: season
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *         description: Season number (1-10)
 *     responses:
 *       200:
 *         description: List of episodes in the season
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Episode'
 *       404:
 *         description: No episodes found for that season
 */
router.get('/season/:season', episodeController.getEpisodesBySeason);

/**
 * @swagger
 * /api/episodes/{id}:
 *   get:
 *     summary: Get episode by ID
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Episode ID
 *     responses:
 *       200:
 *         description: Episode data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Episode'
 *       404:
 *         description: Episode not found
 */
router.get('/:id', episodeController.getEpisodeById);

module.exports = router;