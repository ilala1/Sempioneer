const mongoose = require("mongoose");
const request = require("request");
const axios = require("axios");
const admin = require("firebase-admin");
const uniqid = require("uniqid");

const { google } = require("googleapis");
var serviceAccount = require("../lib/serviceAccountKey.json");


const mongoErrors = (user, error) => {
  let errorMessage = "";

  // Incude name in error if provided
  const { firstName, lastName } = user;

  if (
    firstName &&
    firstName.trim().length > 0 &&
    lastName &&
    lastName.trim().length > 0
  ) {
    errorMessage += `Unable to create an account for <strong>${firstName} ${lastName}</strong>.`;
  } else {
    errorMessage += "Unable to create account";
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
  console.log('get access token')
  // Define the required scopes.
  var scopes = [
    "https://www.googleapis.com/auth/firebase.database",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.metadata",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/presentations",
    "https://www.googleapis.com/auth/documents",
  ];

  // Authenticate a JWT client with the service account.
  var jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    scopes
  );

  // Use the JWT client to generate an access token.
  jwtClient.authorize(function (error, tokens) {
    if (error) {
      console.log("Error making request to generate access token:", error);
    } else if (tokens.access_token === null) {
      console.log(
        "Provided service account does not have permission to generate access tokens"
      );
    } else {
      const accessToken = tokens.access_token;

      console.log(tokens);

      res.send(accessToken);
      // See the "Using the access token" section below for information
      // on how to use the access token to send authenticated requests to
      // the Realtime Database REST API.
    }
  });
};

exports.newUser = async (req, res) => {
  let db = admin.firestore();

  console.log(req.body.userObj);
  const userObj = req.body.userObj;

  let userRef = db.collection("users").doc(userObj.email);

  let setUser = userRef.set({
    uid: userObj.uid,
    displayName: userObj.displayName,
    email: userObj.email,
    accessToken: userObj.accessToken,
    refreshToken: userObj.refreshToken,
  });
};

exports.getUser = async (req, res) => {
  console.log('getUsers')
  const status = 400;
  let db = admin.firestore();
  const userID = req.query.userCookie;
  // console.log('userID ' + userID)
  let usersRef = db.collection("users");
  console.log('userID')
  console.log(userID)
  console.log('userID')
  if (userID !== undefined) {
    console.log('User ID not undefined')
    try {
      let queryRef = await usersRef
        .where("uid", "==", userID)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }

          snapshot.forEach((doc) => {
            const user = doc.data();
            res.send(user);
          });
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });
    } catch (error) {
      console.log(error)
      res.send('No user ID from DB')
    }
  } else {
    console.log('no user iD')
    res.sendStatus(status)
  }
  // res.redirect('/login')

};



// old stuff



exports.getUid = async (req, res) => {
  res.send(uniqid());
};

exports.getLoginURL = async (req, res) => {
  console.log("getting login URL!");
  const result = {};
  result.status = 200;

  // res.send(result);
  const { google } = require("googleapis");
  const oauth2Client = new google.auth.OAuth2(
    "45551424691-5ronoojbj87eftlnu82vcjsqrfo58tln.apps.googleusercontent.com",
    "NpVNQs7MhXsBdzPT9KyJ--Yt",
    "http://localhost:3000"
  );

  // generate a url that asks permissions for user info and GSC scopes
  const scope = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/webmasters",
    "https://www.googleapis.com/auth/webmasters.readonly",
    'https://www.googleapis.com/auth/analytics.readonly',
    // 'https://www.googleapis.com/auth/drive',
    // 'https://www.googleapis.com/auth/drive.appdata',
    // 'https://www.googleapis.com/auth/drive.file',
    // 'https://www.googleapis.com/auth/drive.metadata',
    // 'https://www.googleapis.com/auth/spreadsheets',
    // 'https://www.googleapis.com/auth/presentations',
    // 'https://www.googleapis.com/auth/documents'
  ];
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scope,
  });
  res.send(url);
};

exports.access = async (req, res) => {
  console.log('access')
  const { google } = require("googleapis");
  let db = admin.firestore();
  let code = req.query.authCode;
  let updateExistingLoginTokens;
  let userObj;
  if (code) {
    const oauth2Client = new google.auth.OAuth2(
      // client ID
      "45551424691-5ronoojbj87eftlnu82vcjsqrfo58tln.apps.googleusercontent.com",
      //client secret
      "NpVNQs7MhXsBdzPT9KyJ--Yt",
      //redirect URL
      "http://localhost:3000"
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    //get user details URL
    const userDetails = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`;

    // user details
    let getUser = await axios
      .get(userDetails, {})
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });

    let userID = getUser.id;

    // get user from db
    try {
      const singleUser = await getUserFromFirestore(userID);

      // if user exists in db overwrite tokens or create new
      if (singleUser.email) {
        console.log("existing user exists");
        try {
          let userRef = db.collection("users").doc(getUser.email);

          //update access token
          let updateAccessTokenInDB = userRef.update({
            access_token: tokens.access_token,
          });

          // if refresh token exists update
          if (tokens.refresh_token) {
            console.log("updating refresh token");
            let updateRefreshTokenInDB = userRef.update({
              refresh_token: tokens.refresh_token,
            });
          }
          res.send(singleUser);
        } catch (error) {
          console.error(error);
          return;
        }
      } else {
        console.log("no user");
        let userRef = db.collection("users").doc(getUser.email);

        // new user obj
        let setUser = userRef.set({
          uid: getUser.id,
          displayName: getUser.name,
          email: getUser.email,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date,
          date: Date.now(),
        });
        res.send(userObj);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("no code");
  }
};

getUserFromFirestore = async (req, res) => {
  console.log('getting user from firestore')

  if (req === undefined) {
    console.log('user cookie - undefined')
  } else {
    let userObj = {};
    let db = admin.firestore();
    let usersRef = db.collection("users");
  
    let queryRef = await usersRef
      .where("uid", "==", req)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          userObj = { content: 'null' };
          return userObj;
        }
  
        snapshot.forEach((doc) => {
          const user = doc.data();
          userObj = user;
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  
    return userObj;
  }
};

exports.refreshTokens = async (req, res) => {
  console.log('refreshing tokens')
  let db = admin.firestore();
  const status = 200;
  const { google } = require("googleapis");
  const OAuth2 = google.auth.OAuth2;
  const userObj = req.body.user;

  const singleUser = await getUserFromFirestore(userObj.uid)

  console.log(singleUser)
  // const user = await User.findOne({ _id: userID });

  const oauth2Client = new OAuth2(
    "45551424691-5ronoojbj87eftlnu82vcjsqrfo58tln.apps.googleusercontent.com",
    "NpVNQs7MhXsBdzPT9KyJ--Yt",
    "http://localhost:3000"
  );

  oauth2Client.setCredentials({
    refresh_token:
      singleUser.refresh_token
  });

  const newAccessToken = await oauth2Client.getAccessToken();
  singleUser.access_token = newAccessToken.res.data.access_token;
  singleUser.refresh_token = newAccessToken.res.data.refresh_token;

  const test = newAccessToken.res.data.access_token

  // console.log('newAccessToken')
  // console.log(newAccessToken.res.data.access_token)
  // console.log(newAccessToken.res.data.refresh_token)


  console.log(singleUser)

  try {
    console.log(test)
    let userRef = db.collection("users").doc(singleUser.email);

    let updateAccessTokenInDB = userRef.update({
      access_token: test,
    });

    let updateRefreshTokenInDB = userRef.update({
      refresh_token: newAccessToken.res.data.refresh_token,
    });

    res.send(status)
  } catch (error) {
    return { error: error };
  }
};