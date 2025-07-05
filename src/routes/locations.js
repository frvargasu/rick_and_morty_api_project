const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The location ID
 *         name:
 *           type: string
 *           description: The location's name
 *         type:
 *           type: string
 *           description: The location's type
 *         dimension:
 *           type: string
 *           description: The location's dimension
 *         residents:
 *           type: array
 *           items:
 *             type: string
 *           description: List of residents in this location
 *         url:
 *           type: string
 *           description: The location's URL
 *         created:
 *           type: string
 *           description: When the location was created
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Locations]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of locations
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
 *                     $ref: '#/components/schemas/Location'
 *       404:
 *         description: No locations found
 */
router.get('/', locationController.getAllLocations);

/**
 * @swagger
 * /api/locations/search/{name}:
 *   get:
 *     summary: Search locations by name
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Location name to search
 *     responses:
 *       200:
 *         description: List of matching locations
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
 *                     $ref: '#/components/schemas/Location'
 *       404:
 *         description: No locations found
 */
router.get('/search/:name', locationController.searchLocationsByName);

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get location by ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.get('/:id', locationController.getLocationById);

module.exports = router;