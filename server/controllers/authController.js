require('../models/User');

const mongoose = require('mongoose');
const request = require('request');


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
    console.log('getting Tokens')
    

    var code = req.query.code;
    if (code) {
      console.log("code " + code);
      const oauth2Client = new google.auth.OAuth2(
            '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
            'V05FVaiej7AKwoD8BCLhcnuL',
            'http://localhost:3000'
          );
          
          const {tokens} = await oauth2Client.getToken(code)
          oauth2Client.setCredentials(tokens);
          console.log(tokens.access_token);
          const userDetails = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`;
          let userObj;

          request.get({
            url: userDetails,
            json: true,
            headers: {'User-Agent': 'request'}
          }, (err, res, data) => {
            if (err) {
              console.log('Error:', err);
            } else if (res.statusCode !== 200) {
              console.log('Status:', res.statusCode);
            } else {
              // data is already parsed as JSON:
              console.log(data.name);
              userObj = {
                name: data.name,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                date: Date.now()
              };
              (new User(userObj)).save();

              return
            }
          });
          
      res.redirect('/index');
    }
}

exports.getUser = async (req, res) => {

}

exports.tokens = async (req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
}
