const { Schema } = require('mongoose')

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: true },
    admin: { type: Boolean, required: true },

});

module.exports = userSchema