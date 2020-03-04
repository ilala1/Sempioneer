const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    URL: {
        type: String,
    },
    data: [
        {
            date: String,
            figures: [Number]
        }
    ]
});

module.exports = mongoose.model('Page', pageSchema, 'page');
