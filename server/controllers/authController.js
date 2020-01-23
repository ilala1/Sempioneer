require('../models/User');

const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios');

const User = mongoose.model('User');

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

exports.auth = async (req, res) => {
    const result = {};
    result.status = 200;
    // console.log('valid!');
    // res.send(result);
    const {google} = require('googleapis');
    const oauth2Client = new google.auth.OAuth2(
      '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
      'V05FVaiej7AKwoD8BCLhcnuL',
      'http://localhost:3000'
    );
    
    // generate a url that asks permissions for user info and GSC scopes
    const scope = ['https://www.googleapis.com/auth/userinfo.profile',
                  'https://www.googleapis.com/auth/webmasters']
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
    
      // If you only need one scope you can pass it as a string
      scope: scope
    });

    res.send(url);
};

exports.access = async (req, res) => {
    const {google} = require('googleapis');

    let code = req.query.authCode;

    let updateExistingLoginTokens;
    let userObj;
    if (code) {
      const oauth2Client = new google.auth.OAuth2(
            '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
            'V05FVaiej7AKwoD8BCLhcnuL',
            'http://localhost:3000'
          );
          
          const {tokens} = await oauth2Client.getToken(code)
          oauth2Client.setCredentials(tokens);

          const userDetails = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`;


          let getUserName = await axios.get(userDetails, {})
          .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            return res.data.name;
          })
          .catch((error) => {
            console.error(error)
          })

        updateExistingLoginTokens = await User.findOne({ name: getUserName });


        // if user exists in db overwrite tokens or create new
        if (updateExistingLoginTokens) {
          console.log('existing user exists');
          updateExistingLoginTokens.access_token = tokens.access_token;
          if (tokens.refresh_token) {
            updateExistingLoginTokens.refresh_token = tokens.refresh_token;
          }
          updateExistingLoginTokens.date = Date.now();
  
          try {
            await updateExistingLoginTokens.save();
            res.send(updateExistingLoginTokens);
          } catch (error) {
            console.error(error)
            return
          }
        } else {
          console.log('no user');
          userObj = {
            name: getUserName,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
            date: Date.now()
          };
          (new User(userObj)).save();
          res.send(userObj);
        }
      }
}

exports.refreshTokens = async (req, res) => {
  const status = 200;
  const { google } = require("googleapis");
  const OAuth2 = google.auth.OAuth2;

  const userID = req.body.userID;
  console.log('userID');
  console.log(userID);

  const user = await User.findOne({ _id: userID });

  const oauth2Client = new OAuth2(
    '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
    'V05FVaiej7AKwoD8BCLhcnuL',
    'http://localhost:3000'
  );



  oauth2Client.setCredentials({
    refresh_token:
      user.refresh_token
  });

  const newAccessToken = await oauth2Client.getAccessToken(); 
  console.log(newAccessToken.token);

  user.access_token = newAccessToken.token;
  try {
    // await user.save();
    return status;
} catch (error) {
    return { error: mongoErrors(user, error) };
}


}

exports.getUser = async (req, res) => {

  const userID = req.query.userCookie;
  try {
    const oneUser = await User.findOne({ _id: userID });
    res.send(oneUser);
  } catch (error) {
      console.error(error)
      return
  }

}
