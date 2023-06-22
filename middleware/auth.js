const User = require('../models/user');

exports.authUser = async function (req, res, next) {
    req.auth = false;
    const userId = req.body.userId;
    if (!userId) {
        const error = new Error('User Not Found');
        error.statusCode = 404;
        return next(error);
    }
    let user;
    try {
        user = User.findById(userId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!user) {
        const error = new Error('User Not Found');
        error.statusCode = 404;
        return next(error);
    }
    console.log('User: ', user.name);
    req.auth = true;
    next();
}