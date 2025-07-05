const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The character ID
 *         name:
 *           type: string
 *           description: The character's name
 *         status:
 *           type: string
 *           description: The character's status
 *         species:
 *           type: string
 *           description: The character's species
 *         gender:
 *           type: string
 *           description: The character's gender
 *         image:
 *           type: string
 *           description: The character's image URL
 *         episode:
 *           type: array
 *           items:
 *             type: string
 *           description: List of episodes where this character appeared
 *         location:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             url:
 *               type: string
 *         origin:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             url:
 *               type: string
 */

/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Get all characters
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by character name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [alive, dead, unknown]
 *         description: Filter by character status
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Filter by character species
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [female, male, genderless, unknown]
 *         description: Filter by character gender
 *     responses:
 *       200:
 *         description: List of characters
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
 *                     $ref: '#/components/schemas/Character'
 *       404:
 *         description: No characters found
 */
router.get('/', characterController.getAllCharacters);

/**
 * @swagger
 * /api/characters/search/{name}:
 *   get:
 *     summary: Search characters by name
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Character name to search
 *     responses:
 *       200:
 *         description: List of matching characters
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
 *                     $ref: '#/components/schemas/Character'
 *       404:
 *         description: No characters found
 */
router.get('/search/:name', characterController.searchCharactersByName);

/**
 * @swagger
 * /api/characters/filter:
 *   get:
 *     summary: Filter characters
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [alive, dead, unknown]
 *         description: Filter by character status
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Filter by character species
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [female, male, genderless, unknown]
 *         description: Filter by character gender
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of filtered characters
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
 *                     $ref: '#/components/schemas/Character'
 *       404:
 *         description: No characters found
 */
router.get('/filter', characterController.filterCharacters);

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     summary: Get character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Character ID
 *     responses:
 *       200:
 *         description: Character data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       404:
 *         description: Character not found
 */
router.get('/:id', characterController.getCharacterById);

module.exports = router;