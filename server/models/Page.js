const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    userID: String,
    domain: {
        type: String
    },
    data:[
        {
            date: String,
            deviceSegment: String,
            figures: [Number],
            site_URL: String
        }
    ]

    
});

module.exports = mongoose.model('Page', pageSchema, 'page');
