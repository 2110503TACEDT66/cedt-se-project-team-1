const express = require('express');
const { getMassages, getMassage, createMassage, updateMassage, deleteMassage } = require('../controllers/massages');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const reservationRouter = require('./reservations');
const rating = require('./rating');

router.use('/:massageId/reservations', reservationRouter);
router.use('/:massageShopId/ratings', rating)

router.route('/').get(protect, getMassages).post(protect, authorize('shopOwner'), createMassage);
router.route('/:id').get(getMassage).put(protect, authorize('admin', 'shopOwner'), updateMassage).delete(protect, authorize('admin', 'shopOwner'), deleteMassage);

module.exports = router;

/**
 * @swagger
 * components:
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
 *         region:
 *           type: string
 *           description: region
 *       example:
 *         id: 609bda561452242d88d36e37
 *         ลําดับ: 
 *         name: Happy Massage 
 *         address: 121 ถ.สุขุมวิท
 *         district: บางนา
 *         province: กรุงเทพมหานคร
 *         postalcode: 10110
 *         tel: 02-2187000
 *         region: กรุงเทพมหานคร (Bangkok)
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
 *     responses:
 *       200:
 *         description: The list of the massages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Massage'
 */

/**
* @swagger
* /massages/{id}:
*   get:
*     summary: Get the massage by id
*     tags: [Massages]
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
*       404:
*         description: The massage was not found
*/

/**
* @swagger
* /massages:
*   post:
*     summary: Create a new massage
*     tags: [Massages]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Massage'
*     responses:
*       201:
*         description: The massage was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Massage'
*       500:
*         description: Some server error
*/

/**
* @swagger
* /massages/{id}:
*   put:
*     summary: Update the massage by the id
*     tags: [Massages]
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
*             $ref: '#/components/schemas/Massage'
*     responses:
*       200:
*         description: The massage was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Massage'
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
*       404:
*         description: The massage was not found
*/

