require('dotenv').config({ path: '../config' });

const bodyParser = require('body-parser');
const dustjs = require('adaro');
const express = require('express');
const mongoose = require('mongoose');
const next = require('next');
const path = require('path');
const util = require('util');

const routes = require('./routes');
const admin = require('firebase-admin');
var serviceAccount = require("./lib/serviceAccountKey.json");


const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({
    dir: './client',
    dev,
});


nextApp
    .prepare()
    .then(() => {
    // Database

    if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      }


        // const dbString = `mongodb://${
        //     process.env.DB_USER && process.env.DB_PASS
        //         ? `${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@`
        //         : ''
        // }localhost:27017/${process.env.DB_NAME}`;
        // mongoose.connect(process.env.DATABASE || dbString, {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        // });

        // mongoose.connection.on('error', (err) => {
        //     console.error(err);
        //     process.exit(1);
        // });

        // Express
        const expressApp = express();

        // View engine (DustJS)
        expressApp.set('views', path.join(__dirname, '../client/pages'));

        // expressApp.engine('jsx', require('express-react-views').createEngine());
        // expressApp.set('view engine', 'jsx');
        
        expressApp.engine(
            'dust',
            dustjs.dust({
                helpers: ['dustjs-helpers'],
            }),
        );
        expressApp.set('view engine', 'dust');

        // Use app.render asynchronously
        expressApp.renderAsync = util.promisify(expressApp.render);

        // Requests into req.body
        expressApp.use(bodyParser.json({limit: "50mb"}));
        expressApp.use(
            bodyParser.urlencoded({
                limit: "50mb", 
                extended: true, 
                parameterLimit:50000
            }),
        );

        // Routes
        routes(nextApp, expressApp);

        // Start server
        expressApp.set('port', process.env.PORT || 3000);

        const server = expressApp.listen(expressApp.get('port'), () => {
            console.log(`Express running → PORT ${server.address().port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
