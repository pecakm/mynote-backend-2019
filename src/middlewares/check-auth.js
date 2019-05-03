const jwt = require('jsonwebtoken');
const CONSTANTS = require('../helpers/constants');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedData = jwt.verify(token, CONSTANTS.JWT_SECRET);
        req.userData = decodedData;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }
};
