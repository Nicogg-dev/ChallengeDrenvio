const route = require('express').Router();
const { getAllUsers, createUser, getSpecialPriceAndBrand } = require('../../src/controllers/userController');
const { userValidationRules } = require('../../src/utils/validators/user');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operaciones relacionadas para los productos
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuarios
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               Users: 
 *                - id: 60f5a0c7d4f4b2b1f0d7b1b7
 *                  name: "Juan"
 *                  metadata: 
 *                     precios_especiales: [{nombre_producto: "Nike Air Max 90", precio_especial_personal: 100}]
 *                  
 */
route.get('/users', getAllUsers);


/**
 * @swagger
 * /price/{user_id}:/{nombre_producto}:
 *   get:
 *     summary: Obtener el precio especial para el cliente y el producto, si no tiene precio especial, devuelve precio base.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: precio y slug
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               price: 100
 *               slug: "Nike Air Max 90"
 */
route.get('/price/:user_id/:nombre_producto', getSpecialPriceAndBrand)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear usuario
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuarios
 *         content:
 *           application/json:
 *             example:
 *               name: "Juan"
 *               metadata: 
 *                  precios_especiales: [{nombre_producto: "Nike Air Max 90", precio_especial_personal: 100}]
 */
route.post('/users', userValidationRules, createUser)


module.exports = route;