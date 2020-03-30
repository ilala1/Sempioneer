const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    userID: String,
    domain: {
        type: String
    },
    data:[
        {
            Grouped_Url: String,
            data: [
                {
                    device_segment: String,
                    date: String,
                    figures: [Number],
                    site_url: String
                }
            ]
        }
    ]

    
});

module.exports = mongoose.model('Page', pageSchema, 'page');
