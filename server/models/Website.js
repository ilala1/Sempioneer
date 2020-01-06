const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    data: [{
        permissionLevel: String,
        siteURL: String,
        id: String,
    }]
});

module.exports = mongoose.model('Website', websiteSchema, 'website');
