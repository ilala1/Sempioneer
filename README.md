# Enigma Event Tool

An internal app for making nominations and voting for monthly company meetings.  Includes an administrator restricted area for viewing the nominations and presenting.

Split into two separate [nodeJS](https://nodejs.org) apps:

# Backend

Serving as an API for the frontend to retrieve and store data.  Connected to a [MongoDB](https://www.mongodb.com/) database and using [JWT Web Tokens](https://jwt.io) to securely manage connections.

Assuming user has HomeBrew installed...
If not run the command below in a terminal window;

$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

To install Mongo;
https://wiki.enigma-marketing.co.uk/databases/install-mongodb/ 

# Frontend

Using React for front end.

# Running the app

    Find '.env.local' file in the cofig folder and remove '.local'
    `npm install`
    Need mongo running in the terminal in a seperate tab
        `sudo mongod`
    `npm run dev`


- App will be accessible on http://localhost:3000/



