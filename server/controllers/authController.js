require('../models/User');

const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.auth = async (req, res) => {
    const result = {};
    result.status = 200;
    console.log('valid!');
    // res.send(result);
    const {google} = require('googleapis');

    const oauth2Client = new google.auth.OAuth2(
      '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
      'V05FVaiej7AKwoD8BCLhcnuL',
      'http://localhost:3000'
    );
    
    // generate a url that asks permissions for Blogger and Google Calendar scopes
    
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',
    
      // If you only need one scope you can pass it as a string
      scope: 'https://www.googleapis.com/auth/webmasters'
    });

    res.send(url);
};

exports.access = async (req, res) => {
    const {google} = require('googleapis');
    console.log('getting Tokens')
    console.log(req.query.code);
    
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
  
          console.log("refresh " + tokens.refresh_token);
          
          // oauth2Client.on('tokens', (tokens) => {
          //         if (tokens.refresh_token) {
          //               // store the refresh_token in my database!
          //               console.log(tokens.refresh_token);
          //             }
          //             console.log(tokens.access_token);
          //           });
          req.body.code = code;
          req.body.refresh = tokens.refresh_token;
          req.body.access = tokens.access_token;
      // res.redirect('/index');
        // res.send(tokens);
      await (new User(tokens)).save();
      res.send(tokens);
    }
}

exports.tokens = async (req, res) => {
    console.log(req.body);
      // await (new User(tokens)).save();
      res.send(200);
}
