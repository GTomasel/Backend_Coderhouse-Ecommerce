const { Schema } = require('mongoose')

const productSchema = new Schema({
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        codigo: { type: String, required: true },
        foto: { type: String, required: true },
        categoria: { type: String, required: true },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
        timestamp: { type: String, required: true },
        id: { type: String, required: true },
        qty: { type: Number, required: false },
});

module.exports = productSchema