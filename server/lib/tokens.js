const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    let status = 200;

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

        try {
            // Verify token
            req.decoded = jwt.verify(token, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE,
                issuer: process.env.URL_HOST,
            });

            next();
        } catch (err) {
            status = 401;

            res.status(status).send({
                error: 'Authentication error.',
                status,
            });
        }
    } else {
        status = 400;

        res.status(status).send({
            error: 'Authentication error. Token required.',
            status,
        });
    }
};
