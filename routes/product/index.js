const route = require('express').Router();
const { getAllProductsWithStock, createProduct } = require('../../src/controllers/productController');
const { productValidationRules } = require('../../src/utils/validators/product');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Operaciones relacionadas para los productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos con stock
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: productos con stock
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               products: 
 *                - id: 64948e1e7d5945d973d611bf
 *                  nombre: "Nike Air Max 90"
 *                  precio_base: 150.99
 *                  existencia: 25
 */
route.get('/products', getAllProductsWithStock);


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Agregar un nuevo producto.
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: producto
 *         content:
 *           application/json:
 *             example:
 *                  nombre: "Adidas Stan Smith"
 *                  precio_base: 99.99
 *                  existencia: 15
 * 
 */
route.post('/products', productValidationRules, createProduct);


module.exports = route;