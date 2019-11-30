const mongoose = require('mongoose');

const access = require('../data/users/access.json');
// const statuses = require('../data/users/statuses.json');

const userSchema = new mongoose.Schema({
    access_token: {
        type: String,
        trim: true,
    },
    refresh_token: {
        type: String,
        trim: true,
    }
});

// Email validation (valid and unique)
// userSchema.path('email').validate(value => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(value), 'Please supply a valid Email Address');

// userSchema.path('email').validate(async function duplicateEmail(value) {
//     if (this.isModified('email')) {
//         const count = await this.model('User')
//             .countDocuments({ email: value });

//         return (!count);
//     }

//     return true;
// }, 'A user with the email {VALUE} already exists');

module.exports = mongoose.model('User', userSchema, 'users');
