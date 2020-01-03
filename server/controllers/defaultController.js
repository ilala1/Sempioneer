require('../models/Nomination');

const mongoose = require('mongoose');

const axios = require('axios');

const Nomination = mongoose.model('Nomination');

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

exports.newNomination = async (req, res) => {
    const result = {};
    result.status = 200;
    const nominationObj = req.body;
    console.log(nominationObj);
    await (new Nomination(nominationObj)).save();
    res.send(result);
};

// get
exports.getMany = async (req, res) => {
    const nominations = await Nomination.find();
    res.send(nominations);
};

exports.getNomination = async (req, res) => {
    const nomination = await Nomination
        .findOne({
            _id: req.params.id,
        });

    res.send({ nomination });
};

exports.getWebsites = async (req, res) => {
     const API = 'http://flask-env.idjm3vkzsw.us-east-2.elasticbeanstalk.com/api/gsc_data/get_website_list/';
    let Websites = await axios.post(API, {
        "Access_Token": "ya29.Il-4B2pQ_xOmXQlnnmU9pTOj6LV8Saa3yDm8PC4AhuW-UlJ4sxOu0ocQd7TQYEPTTt9iBChd4pk6bcCbbhH9lweCATHjD-AG7AB8-FuNPh1pYB2IBETUJLOJwdfa5XTS1Q",
        "Refresh_Token": "three",
        "Client_Secret": "two",
        "Authorization_Code": "one"
    })
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      return res;
    })
    .catch((error) => {
      console.error(error)
    })
    console.log(Websites);
};


// update

exports.updateNomination = async (req, res) => {
    const {
        user, status, nomId,
    } = req.body;

    const updatedNomination = {
        _id: req.params.id,
        user,
        status,
        nomId,
        textarea: req.body.nomination.textarea,
    };

    const response = await updateNomination(req, updatedNomination);

    res.send(response);
};

exports.deleteOne = async (req, res) => {
    // const id = req.params;
    console.log(req.body.nomination);
    const nomination = req.body.nomination;
    nomination.status = 'deleted';
    console.log(nomination);
    const response = await updateNomination(req, nomination);
    res.send(response);
};
