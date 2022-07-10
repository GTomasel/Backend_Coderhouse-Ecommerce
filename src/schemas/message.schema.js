const { Schema } = require('mongoose');

const messageSchema = new Schema({
	content: { type: String, required: true },
	userName: { type: String, required: true },
	userAvatar: { type: String, required: true },
	from: { type: String, required: true },
	to: { type: String, required: true },
	timestamp: { type: String, required: true },
});

module.exports = messageSchema;

