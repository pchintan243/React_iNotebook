const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', UserSchema);