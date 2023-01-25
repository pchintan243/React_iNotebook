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

// Create the indexes
const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;