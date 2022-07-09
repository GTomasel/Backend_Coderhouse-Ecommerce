const { Schema } = require('mongoose');

const cartSchema = new Schema({
	id: { type: String, required: true },
	timestamp: { type: String, required: true },
	productos: { type: Array, required: true },
});

module.exports = cartSchema;