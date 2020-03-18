const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    data: [
        {
            permissionLevel: String,
            siteUrl: String,
            id: String,
        }
    ]
});

module.exports = mongoose.model('Website', websiteSchema, 'website');
