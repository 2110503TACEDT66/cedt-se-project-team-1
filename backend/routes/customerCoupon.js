const express = require('express');
const { getCustomerCoupons, getCustomerCoupon, updateCustomerCoupon, deleteCustomerCoupon, addCustomerCoupon, getCustomerCouponByMassage, getCustomerCouponsByUserId } = require('../controllers/customerCoupon.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/:id')
.get(protect, getCustomerCouponsByUserId)
    .get(protect,getCustomerCoupon)
    .put(protect, authorize('admin', 'shopOwner', 'user'), updateCustomerCoupon)
    .delete(protect, authorize('admin', 'shopOwner','user'), deleteCustomerCoupon);

router.route('/massage/:massageId')
    .get(protect, authorize('admin', 'shopOwner', 'user'), getCustomerCouponByMassage);

router.route('/myCoupons/me')
    .get(protect, authorize('admin', 'shopOwner', 'user'), getCustomerCouponsByUserId);

router.route('/')
    .get(protect, authorize('admin', 'shopOwner','user'), getCustomerCoupons)
    .post(protect, authorize('admin','shopOwner', 'user'), addCustomerCoupon);

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
 *     CustomerCoupon:
 *       type: object
 *       required:
 *         - coupon
 *         - user
 *         - massage
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the customer coupon
 *         coupon:
 *           type: string
 *           description: The ID of the associated coupon
 *         user:
 *           type: string
 *           description: The ID of the associated user
 *         massage:
 *           type: string
 *           description: The ID of the associated massage
 *       example:
 *         _id: 660057042718f9bc4a5502ad
 *         coupon: 61002b83ed205238d34e4b3b
 *         user: 5ff9ebc16fc2422e84fe8888
 *         massage: 5ff9ebc16fc2422e84fe9999
 */

/**
* @swagger
* tags:
*   name: Customer Coupons
*   description: The CustomerCoupon managing API
*/

/**
 * @swagger
 * /customerCoupons:
 *   get:
 *     summary: Get all customer coupons
 *     tags: [Customer Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of customer coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerCoupon'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /customerCoupons/{id}:
 *   get:
 *     summary: Get a customer coupon by ID
 *     tags: [Customer Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer coupon to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single customer coupon object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerCoupon'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Customer coupon not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /customerCoupons/myCoupons/me:
 *   get:
 *     summary: Get customer coupons by user ID
 *     tags: [Customer Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of customer coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerCoupon'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Customer coupons not found for the given user
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /customerCoupons/massage/{massageId}:
 *   get:
 *     summary: Get customer coupons by massage ID
 *     tags: [Customer Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: massageId
 *         required: true
 *         description: ID of the massage
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of customer coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerCoupon'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Customer coupons not found for the given massage
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /customerCoupons:
 *   post:
 *     summary: Create a new customer coupon
 *     tags: [Customer Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coupon:
 *                 type: string
 *               user:
 *                 type: string
 *               massage:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created customer coupon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerCoupon'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Coupon or user not found, or not enough points
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /customerCoupons/{id}:
 *   delete:
 *     summary: Delete a customer coupon by ID
 *     tags: [Customer Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer coupon to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted customer coupon
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Customer coupon not found
 *       '500':
 *         description: Internal server error
 */

