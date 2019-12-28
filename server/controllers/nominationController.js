require('../models/Nomination');

const mongoose = require('mongoose');
const request = require('request');

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


// update
const updateNomination = async (req, user) => {
    // Retrieve current user
    const updatedNomination = await Nomination.findOne({ _id: user._id });
    if (!updatedNomination) {
        return { error: 'User not found' };
    }

    // // Store current status (for confirmation messages)
    const currentStatus = updatedNomination.status;

    if (user.textarea) {
        updatedNomination.textarea = user.textarea;
    }


    if (user.status) {
        updatedNomination.status = user.status;
    }

    // // Update user
    try {
        await updatedNomination.save();
    } catch (error) {
        return { error: mongoErrors(user, error) };
    }

    // Success
    let successMessage = 'Nomination Updated!';

    if (currentStatus !== user.status) {
        if (currentStatus !== 'deleted' && user.status === 'deleted') {
            successMessage += 'deleted';
        } else if (currentStatus === 'deleted' && user.status === 'active') {
            successMessage += 'restored';
        }
    } else {
        successMessage += 'updated';
    }

    return {
        success: successMessage,
    };
};

exports.bulkActions = async (req, res) => {
    const ctx = req.body.users;
    const promises = [];
    let responses = [];
    if (ctx.length > 0) {
        ctx.forEach((user, i) => {
            const updatedUser = {
                _id: user.id,
                user: user.user,
                status: user.status,
                nomId: user.nomId,
                textarea: user.textarea,
            };
            console.log(updatedUser);
            // // // Add to array of promises
            promises[i] = updateNomination(req, updatedUser);
        });

        // Process all promises and wait until they are done
        responses = await Promise.all(promises);
    } else {
        responses.push({ error: 'No users supplied' });
    }

    res.send(responses);
};

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
