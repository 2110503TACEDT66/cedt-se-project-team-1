const express = require('express');
const { getMassages, getMassage, createMassage, updateMassage, deleteMassage } = require('../controllers/massages');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const reservationRouter = require('./reservations');
const rating = require('./rating');
const coupon = require('./coupon');
const membership = require('./membership');

router.use('/:massageId/reservations', reservationRouter);
router.use('/:massageShopId/ratings', rating);
router.use("/:massageShopId/memberships", membership);

router.use('/:massageShopId/coupons', coupon);

router.route('/').get(protect, getMassages).post(protect, authorize('shopOwner'), createMassage);
router.route('/:id').get(getMassage).put(protect, authorize('admin', 'shopOwner'), updateMassage).delete(protect, authorize('admin', 'shopOwner'), deleteMassage);

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
 *     Massage:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the massage
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         ลําดับ:
 *           type: string
 *           description: Ordinal number
 *         name:
 *           type: string
 *           description: Massage name
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         tel:
 *           type: string
 *           description: telephone number
 *         description:
 *           type: string
 *           description: description
 *         owner:
 *           type: string
 *           description: owner
 *         overallRating:
 *           type: string
 *           description: overallRating
 *         serviceRating:
 *           type: string
 *           description: serviceRating
 *         transportRating:
 *           type: string
 *           description: transportRating
 *         priceRating:
 *           type: string
 *           description: priceRating
 *         hygieneRating:
 *           type: string
 *           description: hygieneRating
 *         price:
 *           type: number
 *           description: price
 *         reservations:
 *           type: Array
 *           description: reservation  
 *       example:
 *         id: 609bda561452242d88d36e37
 *         ลําดับ: 
 *         name: Happy Massage 
 *         address: 121 ถ.สุขุมวิท
 *         district: บางนา
 *         province: กรุงเทพมหานคร
 *         postalcode: 10110
 *         tel: 02-2187000
 *         description: สปาที่ดีที่สุดในย่านบางนา
 *         owner: 66195e36bbd0d32fbc0b3b9f
 *         overallRating: 5
 *         serviceRating: 5
 *         transportRating: 5
 *         priceRating: 5
 *         hygieneRating: 5
 *         price: 1000
 *         reservations: []
 */

/**
* @swagger
* tags:
*   name: Massages
*   description: The massages managing API
*/

/**
 * @swagger
 * /massages:
 *   get:
 *     summary: Returns the list of all the massages
 *     tags: [Massages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the massages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Massage'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Some server error
 */

/**
* @swagger
* /massages/{id}:
*   get:
*     summary: Get the massage by id
*     tags: [Massages]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The massage id
*     responses:
*       200:
*         description: The massage description by id
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Massage'
*       401:
*         description: Unauthorized
*       404:
*         description: The massage was not found
*       500:
*         description: Some server error
*/

/**
* @swagger
* /massages:
*   post:
*     summary: Create a new massage
*     tags: [Massages]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*              name:
*               type: string
*              address:
*               type: string
*              district:
*               type: string
*              province:
*               type: string
*              postalcode:
*               type: string
*              tel:
*               type: string
*              picture:
*               type: string
*              description:
*               type: string
*              price:
*               type: string
*     responses:
*       201:
*         description: The massage was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Massage'
*       400:
*         description: Some required fields are missing
*       401:
*         description: Unauthorized
*       500:
*         description: Some server error
*/

/**
* @swagger
* /massages/{id}:
*   put:
*     summary: Update the massage by the id
*     tags: [Massages]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The massage id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*              name:
*               type: string
*              address:
*               type: string
*              district:
*               type: string
*              province:
*               type: string
*              postalcode:
*               type: string
*              tel:
*               type: string
*              description:
*               type: string
*              price:
*               type: string
*     responses:
*       200:
*         description: The massage was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Massage'
*       400:
*         description: Some required fields are missing
*       401:
*         description: Unauthorized
*       404:
*         description: The massage was not found
*       500:
*         description: Some error happened
*/

/**
* @swagger
* /massages/{id}:
*   delete:
*     summary: Remove the massage by id
*     tags: [Massages]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The massage id
*     responses:
*       200:
*         description: The massage was deleted
*       401:
*         description: Unauthorized
*       404:
*         description: The massage was not found
*       500:
*         description: Some error happened
*/

