const { Schema, model } = require('mongoose');

const User = new Schema({
    id: {
        type: Number,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    metadata: {
        type: {
            precios_especiales: [{
                nombre_producto: String,
                precio_especial_personal: Number
            }]
        }
    }
});

User.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('User', User);