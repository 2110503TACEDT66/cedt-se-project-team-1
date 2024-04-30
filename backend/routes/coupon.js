const express = require('express');
const { getCoupons, getCoupon, updateCoupon, deleteCoupon, addCoupon } = require('../controllers/coupon.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
    .get(protect, getCoupon)
    .put(protect, authorize('admin', 'shopOwner', 'user'), updateCoupon)
    .delete(protect, authorize('admin', 'shopOwner', 'user'), deleteCoupon);

router.route('/')
    .get(protect, getCoupons)
    .post(protect, authorize('admin', 'shopOwner', 'user'), addCoupon);

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
 *     Coupon:
 *       type: object
 *       required:
 *         - massageShop
 *         - point
 *         - discount
 *         - coverage
 *         - expireAt
 *         - usableUserType
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the coupon
 *         massageShop:
 *           type: string
 *           description: The ID of the associated massage shop
 *         point:
 *           type: number
 *           description: The number of points required to redeem the coupon
 *         discount:
 *           type: number
 *           description: The discount percentage offered by the coupon
 *         coverage:
 *           type: number
 *           description: The coverage of the coupon in terms of services or products
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the coupon was created
 *         expireAt:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the coupon
 *         usableUserType:
 *           type: string
 *           enum:
 *             - user
 *             - member
 *           description: The type of user eligible to use the coupon
 *       example:
 *         _id: 660057042718f9bc4a5502ad
 *         massageShop: 61002b83ed205238d34e4b3b
 *         point: 100
 *         discount: 20
 *         coverage: 500
 *         createdAt: '2024-04-29T12:00:00.000Z'
 *         expireAt: '2024-05-29T12:00:00.000Z'
 *         usableUserType: user
 */

/**
* @swagger
* tags:
*   name: Coupons
*   description: The Coupon managing API
*/

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single coupon object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Coupon not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /massages/{massageShopID}/coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: massageShopID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the massage shop associated with the coupon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              discount:
 *               type: number
 *              coverage:
 *               type: number
 *              point:
 *               type: number
 *              expireAt:
 *               type: string
 *               format: date-time
 *              usableUserType:
 *               type: string
 *     responses:
 *       '201':
 *         description: Successfully created coupon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Massage shop not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Update a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *               coverage:
 *                 type: number
 *               expireAt:
 *                 type: string
 *                 format: date-time
 *               usableUserType:
 *                 type: string
 *                 enum: [user, member]
 *     responses:
 *       '200':
 *         description: Successfully updated coupon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Coupon not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted coupon
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Coupon not found
 *       '500':
 *         description: Internal server error
 */
