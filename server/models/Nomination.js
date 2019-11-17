const mongoose = require('mongoose');

// const access = require('../data/users/nominationNames.json');

const nominationSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    user: {
        type: String,
    },
    status: {
        type: String,
    },
    nomId: {
        type: String,
    },
    name: {
        type: String,
    },
    textarea: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    values: {
        type: Array,
    },
});

module.exports = mongoose.model('Nomination', nominationSchema, 'nominations');
