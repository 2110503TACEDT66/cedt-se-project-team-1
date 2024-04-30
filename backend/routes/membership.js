const express = require('express');
const { getMemberships, getMembership, addMembership, updateMembership, deleteMembership } = require('../controllers/membership.js');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
    .get(protect, getMembership)
    .put(protect, authorize('admin', 'user'), updateMembership)
    .delete(protect, authorize('admin', 'user'), deleteMembership);


router.route('/')
    .get(protect, getMemberships)
    .post(protect, authorize('admin', 'user'), addMembership);

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
 *     Membership:
 *       type: object
 *       required:
 *         - user
 *         - massageShop
 *         - expireAt
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the membership
 *         user:
 *           type: string
 *           description: The ID of the associated user
 *         massageShop:
 *           type: string
 *           description: The ID of the associated massage shop
 *         startAt:
 *           type: string
 *           format: date-time
 *           description: The start date of the membership
 *         expireAt:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the membership
 *         renew:
 *           type: boolean
 *           description: Indicates if the membership is eligible for renewal
 *       example:
 *         _id: 660057042718f9bc4a5502ad
 *         user: 61002b83ed205238d34e4b3b
 *         massageShop: 61002b83ed205238d34e4b3b
 *         startAt: '2024-04-29T12:00:00.000Z'
 *         expireAt: '2024-05-29T12:00:00.000Z'
 *         renew: true
 */

/**
* @swagger
* tags:
*   name: Memberships
*   description: The Memberships managing API
*/

/**
 * @swagger
 * /memberships:
 *   get:
 *     summary: Get memberships
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of memberships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       '400':
 *         description: Bad request (missing massage shop ID for shop owners)
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * massages/{massageShopID}/memberships:
 *   get:
 *     summary: Get memberships
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: massageShopId
 *         schema:
 *           type: string
 *         description: ID of the massage shop (required for shop owners, optional for admins)
 *     responses:
 *       '200':
 *         description: A list of memberships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       '400':
 *         description: Bad request (missing massage shop ID for shop owners)
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
 
/**
 * @swagger
 * /memberships/{id}:
 *   get:
 *     summary: Get a membership by ID
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the membership to retrieve
 *     responses:
 *       '200':
 *         description: A single membership object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Membership not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * massages/{massageShopID}/memberships:
 *   post:
 *     summary: Create a new membership
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: massageShopId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the massage shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               expireAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '201':
 *         description: Successfully created membership
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request (user or massage shop not found, or user already a member)
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /memberships/{id}:
 *   put:
 *     summary: Update a membership by ID
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the membership to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               expireAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       '200':
 *         description: Successfully updated membership
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       '400':
 *         description: Bad request (user or massage shop not found)
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Membership not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /memberships/{id}:
 *   delete:
 *     summary: Delete a membership by ID
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the membership to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted membership
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Membership not found
 *       '500':
 *         description: Internal server error
 */
