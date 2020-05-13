require('../models/User');

const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios');
const admin = require('firebase-admin');
const uniqid = require('uniqid');

const {google} = require("googleapis");
var serviceAccount = require("../lib/serviceAccountKey.json");
// require('../lib/config.js')

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

//firebase

exports.getAccessToken = async (req, res) => {
  // Define the required scopes.
  var scopes = [
    'https://www.googleapis.com/auth/firebase.database',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/presentations',
    'https://www.googleapis.com/auth/documents'
  ];

  // Authenticate a JWT client with the service account.
  var jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    scopes
  );

  // Use the JWT client to generate an access token.
  jwtClient.authorize(function(error, tokens) {
    if (error) {
      console.log("Error making request to generate access token:", error);
    } else if (tokens.access_token === null) {
      console.log("Provided service account does not have permission to generate access tokens");
    } else {
      const accessToken = tokens.access_token;

      console.log(tokens);

      
      res.send(accessToken)
      // See the "Using the access token" section below for information
      // on how to use the access token to send authenticated requests to
      // the Realtime Database REST API.
    }
  });
}

exports.newUser = async (req, res) => {
  let db = admin.firestore();
  
  console.log(req.body.userObj);
  const userObj = req.body.userObj

  let userRef = db.collection('users').doc(userObj.email);

  let setUser = userRef.set({
    uid: userObj.uid,
    displayName: userObj.displayName,
    email: userObj.email,
    accessToken: userObj.accessToken,
    refreshToken: userObj.refreshToken
  });
  
}

exports.getUser = async (req, res) => {
  let db = admin.firestore();
  const userID = req.query.userCookie;
  let usersRef = db.collection('users');
  let queryRef = await usersRef.where('uid', '==', userID).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    snapshot.forEach(doc => {
      const user = doc.data();
      res.send(user);
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  // try {
  //   const oneUser = await User.findOne({ _id: userID });
  // } catch (error) {
  //     console.error(error)
  //     return
  // }

}


// old stuff

exports.getUid = async (req, res) => {
    res.send(uniqid())
}

exports.auth = async (req, res) => {
  console.log('valid!');
    const result = {};
    result.status = 200;
    // res.send(result);
    const {google} = require('googleapis');
    const oauth2Client = new google.auth.OAuth2(
      '45551424691-5ronoojbj87eftlnu82vcjsqrfo58tln.apps.googleusercontent.com',
      'NpVNQs7MhXsBdzPT9KyJ--Yt',
      'http://localhost:3000'
    );
    
    // generate a url that asks permissions for user info and GSC scopes
    const scope = ['https://www.googleapis.com/auth/userinfo.profile',
                  'https://www.googleapis.com/auth/webmasters',
                  'https://www.googleapis.com/auth/webmasters.readonly',
                  'https://www.googleapis.com/auth/analytics.readonly',
                  'https://www.googleapis.com/auth/drive',
                  'https://www.googleapis.com/auth/drive.appdata',
                  'https://www.googleapis.com/auth/drive.file',
                  'https://www.googleapis.com/auth/drive.metadata',
                  'https://www.googleapis.com/auth/spreadsheets',
                  'https://www.googleapis.com/auth/presentations',
                  'https://www.googleapis.com/auth/documents']
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
  
      // If you only need one scope you can pass it as a string
      scope: scope
    });
    console.log(url);
    res.send(url);
};

exports.access = async (req, res) => {
    const {google} = require('googleapis');

    let code = req.query.authCode;

    let updateExistingLoginTokens;
    let userObj;
    if (code) {
      const oauth2Client = new google.auth.OAuth2(
            // client ID
            '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
            //client secret
            'V05FVaiej7AKwoD8BCLhcnuL',
            //redirect URL
            'http://localhost:3000'
          );
          
          const {tokens} = await oauth2Client.getToken(code)
          oauth2Client.setCredentials(tokens);

          const userDetails = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`;


          let getUserName = await axios.get(userDetails, {})
          .then((res) => {
            // console.log(`statusCode: ${res.statusCode}`)
            return res.data.name;
          })
          .catch((error) => {
            console.error(error)
          })

        // updateExistingLoginTokens = await User.findOne({ name: getUserName });


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
          // (new User(userObj)).save();
          res.send(userObj);
        }
      }
}

exports.refreshTokens = async (req, res) => {
  const status = 200;
  const { google } = require("googleapis");
  const OAuth2 = google.auth.OAuth2;

  const userID = req.body.userID;
  console.log(userID);
  // const user = await User.findOne({ _id: userID });

  const oauth2Client = new OAuth2(
    '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
    'V05FVaiej7AKwoD8BCLhcnuL',
    'http://localhost:3000'
  );
  
  // oauth2Client.setCredentials({
  //   refresh_token:
  //     userID.refresh_token
  // });

  // const newAccessToken = await oauth2Client.getAccessToken(); 
  // user.access_token = newAccessToken.token;

  // try {
  //   await user.save();
  //   res.send(status)
  // } catch (error) {
  //     return { error: mongoErrors(user, error) };
  // }
}

