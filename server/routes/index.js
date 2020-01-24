const authController = require('../controllers/authController');
const voteController = require('../controllers/voteController');
const nominationController = require('../controllers/nominationController');
const defaultController = require('../controllers/defaultController');

module.exports = (nextApp, expressApp) => {
    // API
    const api = `/api/v${process.env.API_VERSION}`;

    // Auth

    expressApp.post('/api/valid', authController.auth);

    // Nomination tasks
    expressApp.post('/api/nomination', nominationController.newNomination);
    expressApp.get('/api/nominations', nominationController.getMany);

    expressApp.put('/api/delete/:id', nominationController.deleteOne);
    expressApp.put('/api/bulk', nominationController.bulkActions);

    expressApp.get('/api/nomination/:id', nominationController.getNomination);

    expressApp.put('/api/nomination/:id', nominationController.updateNomination);

    // Voting
    expressApp.post('/api/vote', voteController.vote);
    expressApp.get('/api/allVotes', voteController.getVotes);



    expressApp.get('/api/index', authController.access);

    expressApp.get('/api/oneUser', authController.getUser);

    expressApp.post('/api/website', defaultController.addWebsite);
    
    expressApp.post('/api/refreshTokens', authController.refreshTokens);

    expressApp.post('/api/earliestAvailableDate', defaultController.getEarliestAvailableDate);



    // Default all remaining routes to nextJs (client-side)
    const handler = nextApp.getRequestHandler();

    expressApp.get('*', (req, res) => handler(req, res));
};
