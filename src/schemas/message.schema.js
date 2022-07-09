const { Schema } = require('mongoose');

const messageSchema = new Schema({
	content: { type: String, required: true },
	id: { type: String, required: true },
	timestamp: { type: String, required: true },
});

module.exports = messageSchema;