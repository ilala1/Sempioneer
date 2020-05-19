const authController = require('../controllers/authController');
const defaultController = require('../controllers/defaultController');

module.exports = (nextApp, expressApp) => {
    // API
    const api = `/api/v${process.env.API_VERSION}`;

    // Auth


    expressApp.post('/api/signout', authController.signout);


    expressApp.post('/api/newUser', authController.newUser);

    expressApp.get('/api/accessToken', authController.getAccessToken);
    

    expressApp.get('/api/oneUser', authController.getUser);





// old login process


    expressApp.get('/api/uid', authController.getUid);

    expressApp.post('/api/valid', authController.auth);

    expressApp.get('/api/index', authController.access);



  

    expressApp.post('/api/website', defaultController.addWebsitesToDB);
    
    expressApp.post('/api/refreshTokens', authController.refreshTokens);

    expressApp.post('/api/pagesdata', defaultController.postPagesData);

    expressApp.get('/api/pagesdata', defaultController.getPagesData);

    // expressApp.get('/api/dbPageData', defaultController.getPagesData);



    // Default all remaining routes to nextJs (client-side)
    const handler = nextApp.getRequestHandler();

    expressApp.get('*', (req, res) => handler(req, res));
};
