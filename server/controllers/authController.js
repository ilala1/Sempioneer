require('../models/User');

const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios');

const User = mongoose.model('User');

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
    var url = req.query.href;
    var arrStr = url.split(/[=&]/);

    const code = arrStr[1];
    console.log(code);
    let updateExistingLoginTokens;
    let userObj;
    if (code) {
      console.log('code')
      const oauth2Client = new google.auth.OAuth2(
            '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
            'V05FVaiej7AKwoD8BCLhcnuL',
            'http://localhost:3000'
          );
          
          const {tokens} = await oauth2Client.getToken(code)
          oauth2Client.setCredentials(tokens);

          console.log('tokens');
          console.log(tokens);
          console.log('tokens');

          // const userDetails = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`;


          // let getUserName = await axios.get(userDetails, {})
          // .then((res) => {
          //   console.log(`statusCode: ${res.statusCode}`)
          //   return res.data.name;
          // })
          // .catch((error) => {
          //   console.error(error)
          // })

          // console.log('test2');
          // console.log(getUserName);
          // console.log('test2');

        // updateExistingLoginTokens = await User.findOne({ name: getUserName });


        // if user exists in db overwrite tokens or create new
        // if (updateExistingLoginTokens) {
        //   console.log('existing user exists');
        //   updateExistingLoginTokens.access_token = tokens.access_token;
        //   if (tokens.refresh_token) {
        //     updateExistingLoginTokens.refresh_token = tokens.refresh_token;
        //   }
        //   updateExistingLoginTokens.date = Date.now();
  
        //   try {
        //     await updateExistingLoginTokens.save();
        //   } catch (error) {
        //       return { error: mongoErrors(user, error) };
        //   }
        // } else {
        //   console.log('no user');
        //   userObj = {
        //     name: getUserName,
        //     access_token: tokens.access_token,
        //     refresh_token: tokens.refresh_token,
        //     date: Date.now()
        //   };
        //   (new User(userObj)).save();
        // }
        // res.render('index');
      }
      console.log('test');
      console.log(userObj);
      console.log('test');
      console.log(updateExistingLoginTokens);
      res.send('test');
}

exports.getUser = async (req, res) => {

}

exports.tokens = async (req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
}
