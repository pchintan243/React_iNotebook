const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    date: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('user', UserSchema);
module.exports = User;