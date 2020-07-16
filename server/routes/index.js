const authController = require('../controllers/authController');
const defaultController = require('../controllers/defaultController');

module.exports = (nextApp, expressApp) => {
    // API
    const api = `/api/v${process.env.API_VERSION}`;

    // Auth
    expressApp.get('/api/uid', authController.getUid);

    expressApp.post('/api/loginURL', authController.getLoginURL);
    expressApp.get('/api/index', authController.access);

    expressApp.post('/api/newUser', authController.newUser);
    expressApp.get('/api/oneUser', authController.getUser);

    expressApp.post('/api/refreshTokens', authController.refreshTokens);

    // Website stuff
    expressApp.post('/api/website', defaultController.addWebsitesToDB);
    
    // dashboard pages stuff
    expressApp.post('/api/pagesdata', defaultController.postPagesData);
    expressApp.get('/api/pagesdata', defaultController.getPagesData);
    
    //Daily Pull
    expressApp.get('/api/schedule', defaultController.scheduledJob);


    // expressApp.get('/api/dbPageData', defaultController.getPagesData);

    // Default all remaining routes to nextJs (client-side)
    const handler = nextApp.getRequestHandler();

    expressApp.get('*', (req, res) => handler(req, res));
};
