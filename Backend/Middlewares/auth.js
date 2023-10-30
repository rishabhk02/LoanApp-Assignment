const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    if (req.user) {
        return next();
    }
    const token = (req.cookies) ? req.cookies.token : null;
    console.log(token);
    if (!token || token == null) {
        return res.status(401).redirect('/login');
    }
    try {
        // adding user to the request header
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).redirect('/login');
    }
}

function unAuthenticate(req, res, next) {
    const token = (req.cookies) ? req.cookies.token : null;
    if (!token || token == null) {
        return next();
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        return res.status(401).redirect('/');
    } catch (error) {
        return next();
    }
}



module.exports = { authenticate, unAuthenticate };