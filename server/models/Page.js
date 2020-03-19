const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    userID: String,
    allData: [
        {
            URL: {
                type: String
            },
            data:[
                {
                    date: String,
                    figures: [Number]
                }
            ]
        } 
    ]
    
});

module.exports = mongoose.model('Page', pageSchema, 'page');
