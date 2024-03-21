const { validationResult } = require('express-validator');

const User = require('../models/User.js');
const Product = require('../models/Product.js');

getAllUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json({ ok: true, Users });
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
    }
};

getSpecialPriceAndBrand = async (req, res) => {
    try {
        const nombreproducto = req.params.nombre_producto;
        const userid = req.params.user_id;

        const product = await Product.findOne({ nombre: nombreproducto });
        if (!product) {
            return res.status(404).json({ ok: true, error: 'Producto no encontrado.' });
        }

        const user = await User.findOne({ id: userid });
        if (!user) {
            return res.status(404).json({ ok: true, error: 'Usuario no encontrado.' });
        }

        if (user.metadata) {
            const producto = user.metadata.precios_especiales.find(p => p.nombre_producto === nombreproducto);
            
            if (producto) {
                res.status(200).json({ ok: true, precio: producto.precio_especial_personal, slug: nombreproducto });
            } else {
                res.status(200).json({ ok: true, precio: product.precio_base, slug: nombreproducto });
            }
        }else{
            res.status(200).json({ ok: true, precio: product.precio_base, slug: nombreproducto });
        }

    } catch (error) {
        res.status(500).json({ ok: false, error: 'Error interno del servidor.' });
    }
};

createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ ok: false, errors: errors.array() });
        }

        const { nombre, metadata } = req.body;
        const newUser = await User.create({ nombre, metadata });
        res.status(201).json({ ok: true, newUser });
    } catch (error) {
        res.status(400).json({ ok: false, error: 'Error al crear el usuario.' });
    }
};


module.exports = { getAllUsers, getSpecialPriceAndBrand, createUser };