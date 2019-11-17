const mongoose = require('mongoose');

const access = require('../data/users/access.json');
// const statuses = require('../data/users/statuses.json');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Please supply a first name',
        trim: true,
    },
    lastName: {
        type: String,
        required: 'Please supply a last name',
        trim: true,
    },
    email: {
        type: String,
        required: 'Please supply a valid email address',
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
    },
    access: {
        type: String,
        enum: {
            values: access.map(a => a.id),
            message: '<strong>{VALUE}</strong> is not a valid access level',
        },
        default: 'user',
        required: 'Please select an access level',
    },
    created: {
        date: Date,
        by: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    updated: {
        date: Date,
        by: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    deleted: {
        date: Date,
        by: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

// Email validation (valid and unique)
userSchema.path('email').validate(value => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(value), 'Please supply a valid Email Address');

userSchema.path('email').validate(async function duplicateEmail(value) {
    if (this.isModified('email')) {
        const count = await this.model('User')
            .countDocuments({ email: value });

        return (!count);
    }

    return true;
}, 'A user with the email {VALUE} already exists');

module.exports = mongoose.model('User', userSchema, 'users');
