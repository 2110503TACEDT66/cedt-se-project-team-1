const express = require('express');
const { getReservations,getReservation,addReservation,updateReservation,deleteReservation} = require('../controllers/reservations');

const router = express.Router({mergeParams: true});

const { protect,authorize } = require('../middleware/auth');

router.route('/')
    .get(protect,getReservations)
    .post(protect,authorize('admin','user'),addReservation);
router.route('/:id')
    .get(protect,getReservation)
    .put(protect,authorize('admin','user'),updateReservation)
    .delete(protect,authorize('admin','user'),deleteReservation);

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
 *     Reservation:
 *       type: object
 *       required:
 *         - apptDate
 *         - user
 *         - massage
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the reservation
 *         apptDate:
 *           type: string
 *           format: date-time
 *           description: The appointment date
 *         user:
 *           type: string
 *           description: The ID of the user who made the reservation
 *         massage:
 *           type: string
 *           description: The ID of the massage associated with the reservation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the reservation was created
 *         price:
 *           type: number
 *           description: The price of the reservation
 *       example:
 *         _id: 609c18d5b7e1ff40d0e03aa6
 *         apptDate: "2024-05-15T10:00:00Z"
 *         user: 609c18d5b7e1ff40d0e03aa7
 *         massage: 609c18d5b7e1ff40d0e03aa8
 *         createdAt: "2024-05-13T08:00:00Z"
 *         price: 50
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: The Reservations managing API
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reservation to retrieve
 *     responses:
 *       '200':
 *         description: A reservation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Reservation not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * massages/{massageId}/reservations:
 *   post:
 *     summary: Add a new reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: massageId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the massage to reserve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              apptDate:
 *               type: string
 *               format: date-time
 *              user:
 *               type: string
 *              price:
 *               type: number
 *     responses:
 *       '200':
 *         description: A new reservation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '400':
 *         description: Bad request or massage shop is fully booked
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Massage not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reservation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              apptDate:
 *               type: string
 *               format: date-time
 *              user:
 *               type: string
 *              massage:
 *               type: string
 *     responses:
 *       '200':
 *         description: The updated reservation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Reservation not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reservation to delete
 *     responses:
 *       '200':
 *         description: Reservation deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Reservation not found
 *       '500':
 *         description: Internal server error
 */

