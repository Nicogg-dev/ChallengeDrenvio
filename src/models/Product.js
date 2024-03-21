const { Schema, model } = require('mongoose');

const Product = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    precio_base: {
        type: Number,
        required: true,
        trim: true,
    },
    existencia: {
        type: Number,
        required: true,
        trim: true,
    }
});

Product.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Product', Product);