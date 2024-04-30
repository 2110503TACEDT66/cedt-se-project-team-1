const express = require('express');
const { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserPoint } = require('../controllers/user.js');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth.js');

router.route('/:id')
    .put(protect, authorize('admin', 'user'), updateUserPoint)
    .get(protect, authorize('admin', 'user', 'shopOwner'), getUser)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);


router.route('/')
    .get(protect, authorize('admin'), getUsers)
    .post(protect, authorize('admin'), createUser)


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
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user
 *           example: 609d8d5b6a7a1b2e8c098a3f
 *         name:
 *           type: string
 *           description: User's name
 *           example: John Doe
 *         telephone:
 *           type: string
 *           description: User's telephone number
 *           example: "1234567890"
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: john.doe@gmail.com
 *         role:
 *           type: string
 *           enum: [user, admin, shopOwner]
 *           default: user
 *           description: User's role
 *           example: user
 *         password:
 *           type: string
 *           description: User's password (hashed)
 *           example: $2a$10$4y4XsAA7oVoJL1Ad... # Hashed password
 *         resetPasswordToken:
 *           type: string
 *           description: Token used for resetting password
 *           example: abcdef123456
 *         resetPasswordExpire:
 *           type: string
 *           format: date-time
 *           description: Expiry date for the reset password token
 *           example: "2024-05-01T10:00:00.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the user account was created
 *           example: "2024-04-30T10:00:00.000Z"
 *         point:
 *           type: number
 *           description: User's point
 *           example: 0
 */

/**
 * @swagger
 * tags:
 *   name: Points
 *   description: The Points managing API
 */

/**
 * @swagger
 * /points/{id}:
 *   put:
 *     summary: Update user's point by ID
 *     tags: [Points]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose point needs to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              point:
 *               type: number
 *     responses:
 *       '201':
 *         description: User's point updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Failed to update user's point
 */  
