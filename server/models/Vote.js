const mongoose = require('mongoose');

// const access = require('../data/users/nominationNames.json');

const voteSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    prettyName: {
        type: String,
    },
    user: {
        type: String,
    },
    nomId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    votes: {
        type: Number,
    },
});

module.exports = mongoose.model('Vote', voteSchema, 'vote');
