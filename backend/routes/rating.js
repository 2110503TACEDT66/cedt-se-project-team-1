const express = require('express');
const { getRating, getRatings, updateRating, deleteRating, addRating } = require('../controllers/rating.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
    .get(protect,getRating)
    .put(protect, authorize('admin', 'user'), updateRating)
    .delete(protect, authorize('admin', 'user'), deleteRating);

router.route('/')
    .get(protect, getRatings)
    .post(protect, authorize('admin', 'user'), addRating);

module.exports = router;


/** 
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Rating:
 *       type: object
 *       required:
 *         - serviceRating
 *         - transportRating
 *         - priceRating
 *         - hygieneRating
 *         - overallRating
 *         - comment
 *         - user
 *         - massageShop
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the rating
 *         serviceRating:
 *           type: number
 *           description: The rating for service (0 to 5)
 *         transportRating:
 *           type: number
 *           description: The rating for transport (0 to 5)
 *         priceRating:
 *           type: number
 *           description: The rating for price (0 to 5)
 *         hygieneRating:
 *           type: number
 *           description: The rating for hygiene (0 to 5)
 *         overallRating:
 *           type: number
 *           description: The overall rating (0 to 5)
 *         comment:
 *           type: string
 *           description: The comment for the rating
 *         user:
 *           type: string
 *           description: The ID of the user who gave the rating
 *         massageShop:
 *           type: string
 *           description: The ID of the massage shop being rated
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the rating was created
 *       example:
 *         _id: 660057042718f9bc4a5502ad
 *         serviceRating: 4
 *         transportRating: 5
 *         priceRating: 3
 *         hygieneRating: 4
 *         overallRating: 4
 *         comment: "Great service!"
 *       user: 61002b83ed205238d34e4b3b
 *       massageShop: 61002b83ed205238d34e4b3b
 *       createdAt: '2024-04-29T12:00:00.000Z'
 */

/**
* @swagger
* tags:
*   name: Ratings
*   description: The Ratings managing API
*/

/**
 * @swagger
 *  /ratings:
 *    get:
 *      summary: Get all ratings
 *      tags: [Ratings]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: A list of ratings
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Rating'
 *        '401':
 *          description: Unauthorized
 *        '500':
 *          description: Internal server error
 */

/**
 * @swagger
 * /massages/{massageShopID}/ratings:
 *   get:
 *     summary: Get rating by massage shop ID
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: massageShopID
 *         schema:
 *           type: string
 *         description: ID of the massage shop
 *     responses:
 *       '200':
 *         description: A list of ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       '400':
 *         description: Bad request (missing massage shop ID for shop owners)
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 *  /ratings/{id}:
 *    get:
 *      summary: Get a rating by ID
 *      tags: [Ratings]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the rating to retrieve
 *      responses:
 *        '200':
 *          description: A rating object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rating'
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Rating not found
 *        '500':
 *          description: Internal server error
 */

/**
 * @swagger
 * /massages/{massageShopID}/ratings:
 *    post:
 *      summary: Add a new rating
 *      tags: [Ratings]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: massageShopID
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the massage shop being rated
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                serviceRating:
 *                  type: number
 *                transportRating:
 *                  type: number
 *                priceRating:
 *                  type: number
 *                hygieneRating:
 *                  type: number
 *                comment:
 *                  type: string
 *              required:
 *                - serviceRating
 *                - transportRating
 *                - priceRating
 *                - hygieneRating
 *                - comment
 *      responses:
 *        '201':
 *          description: A successful rating creation response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rating'
 *        '400':
 *          description: Bad request or user has not reserved the massage shop
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Massage shop not found
 *        '500':
 *          description: Internal server error
 */

/**
 * @swagger
 * /ratings/{id}:
 *    put:
 *      summary: Update a rating
 *      tags: [Ratings]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the rating to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rating'
 *      responses:
 *        '200':
 *          description: A successful rating update response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rating'
 *        '400':
 *          description: Bad request
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Rating not found
 *        '500':
 *          description: Internal server error
 */
/**
 * @swagger
 * /ratings/{id}:
 *    delete:
 *      summary: Delete a rating
 *      tags: [Ratings]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: The ID of the rating to delete
 *      responses:
 *        '200':
 *          description: Rating deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: Rating deleted successfully
 *        '401':
 *          description: Unauthorized
 *        '404':
 *          description: Rating not found
 *        '500':
 *          description: Internal server error
 */

