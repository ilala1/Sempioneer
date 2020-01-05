const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    permissionLevel: {
        type: String,
        trim: true,
    },
    siteURL: {
        type: String,
        trim: true,
    },
    user: {
        type: String
    }
});

module.exports = mongoose.model('Website', websiteSchema, 'websites');
