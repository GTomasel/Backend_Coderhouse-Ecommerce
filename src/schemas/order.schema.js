const { Schema } = require('mongoose');

const orderSchema = new Schema({
	id: { type: String, required: true },
	userId: { type: String, required: true },
	timestamp: { type: String, required: true },
	productos: { type: Array, required: true },
});

module.exports = orderSchema;