require('../models/Website');

const mongoose = require('mongoose');

const Website = mongoose.model('Website');

const axios = require('axios');


const mongoErrors = (user, error) => {
    let errorMessage = '';

    // Incude name in error if provided
    const { firstName, lastName } = user;

    if (firstName && firstName.trim().length > 0
        && lastName && lastName.trim().length > 0) {
        errorMessage += `Unable to create an account for <strong>${firstName} ${lastName}</strong>.`;
    } else {
        errorMessage += 'Unable to create account';
    }

    // Include any mongo validation errors
    const { errors } = error;

    Object.keys(errors).forEach((key) => {
        if (errors[key].message) {
            errorMessage += `<br> - ${errors[key].message}`;
        }
    });

    return errorMessage;
};

exports.addWebsite = async (req, res) => {
    const result = {};
    result.status = 200;
    const UserObj = req.body.site;
    console.log('UserObj');
    console.log(UserObj);
    console.log('UserObj');



    await (new Website(UserObj)).save();
    res.send(result);
};

