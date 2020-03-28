const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    userID: String,
    domain: {
        type: String
    },
    data:[
        {
            date: String,
            device_segment: String,
            figures: [Number],
            site_url: String
        }
    ]

    
});

module.exports = mongoose.model('Page', pageSchema, 'page');
