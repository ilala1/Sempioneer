const mongoose = require('mongoose');

const access = require('../data/users/access.json');
// const statuses = require('../data/users/statuses.json');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    access_token: {
        type: String,
        trim: true,
    },
    refresh_token: {
        type: String,
        trim: true,
    },
    expiry_date: {
        type: Date
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('User', userSchema, 'users');
