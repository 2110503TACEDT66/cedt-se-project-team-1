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
 * tags:
 *   name: Points
 *   description: The Points managing API
 */

/**
 * @swagger
 * /api/user/{id}/point:
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
 *       - in: body
 *         name: point
 *         required: true
 *         description: Amount to update the user's point
 *         schema:
 *           type: object
 *           properties:
 *             point:
 *               type: number
 *               description: Amount to update the user's point
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
