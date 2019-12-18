require('../models/User');

const mongoose = require('mongoose');


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
          const userDetails = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`;

          console.log(userDetails);

          req.body.code = code;
          req.body.refresh = tokens.refresh_token;
          req.body.access = tokens.access_token;
      // res.redirect('/index');
        // res.send(tokens);
      await (new User(tokens)).save();

      res.redirect(userDetails);
    }
}

exports.tokens = async (req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
}
