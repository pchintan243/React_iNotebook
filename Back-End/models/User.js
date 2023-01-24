const mongoose = require('mongoose');

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

const user = mongoose.model('user', UserSchema);