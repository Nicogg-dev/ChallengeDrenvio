const { validationResult } = require('express-validator');

const Product = require('../models/Product.js');


getAllProductsWithStock = async (req, res) => {
    try {
        const Products = await Product.find({ existencia: { $gt: 0 } });
        res.status(200).json({ok: true,products: Products});
    } catch (error) {
        res.status(500).json({ok: false, error: 'Error interno del servidor.' });
    }
};



createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ok: false, errors: errors.array() });
        }

        const { nombre, precio_base, existencia } = req.body; 
        const newProduct = await Product.create({ nombre, precio_base, existencia }); 
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el producto.' });
    }
};




module.exports = { getAllProductsWithStock, createProduct};