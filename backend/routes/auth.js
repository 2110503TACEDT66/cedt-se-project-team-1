const express = require('express');
const {register,login,getMe,logout} = require('../controllers/auth');

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;

/**
 * @swagger
 * components:
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
*   name: Authentication
*   description: The Authentication managing API
*/

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Logout the current user
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: User logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get information about the currently logged-in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       '200':
 *         description: User information retrieval successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *              email:
 *               type: string
 *              telephone:
 *               type: string
 *              password:
 *               type: string
 *              role:
 *               type: string
 *     responses:
 *       '200':
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login with existing user credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *               type: string
 *              password:
 *               type: string
 *     responses:
 *       '200':
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid credentials
 */


