//Other
const senstive = require('../senstive');

//Packages
const bcrypt = require('bcryptjs');
const ElasticEmail = require('elasticemail');
const elasticEmailClient = ElasticEmail.createClient({
    apiKey: senstive.EmailApiKey
});

const jwt = require('jsonwebtoken');
//Models
const Task = require('../models/task');
const TaskList = require('../models/taskList');
const User = require('../models/user');
const Session = require('../models/session');


exports.createUser = async function (req, res, next) {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    let existingUser;
    try {
        existingUser = await User.findOne({
            email: email
        });
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    let hashedPW
    try {
        hashedPW = await bcrypt.hash(password, 12);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }

    const user = new User({
        email: email,
        name: name,
        password: hashedPW,
        taskList: []
    })
    let savedUser;
    try {
        savedUser = await user.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 500;
        throw err;
    }
    res.status(201).json({
        message: 'User Created Successfully',
        statusCode: 201
    });
};

exports.updateUser = async function (req, res, next) {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    let user;
    try {
        user = await User.findOne({
            email: email
        });
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!user) {
        const err = new Error('User Not Found');
        err.statusCode = 404;
        return next(err);
    }
    let isEqual = false;

    try {
        isEqual = await bcrypt.compare(password, user.password);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!isEqual) {
        const err = new Error('Wrong Password');
        err.statusCode = 401;
        return next(err);
    }
    if (name) {
        user.name = name;
    }
    let savedUser;
    try {
        savedUser = await user.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 500;
        return next(err);
    }
    return res.status(200).json({
        message: 'User Updated Successfully',
        statusCode: 200
    });
};

exports.deleteUser = async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    let user;
    try {
        user = await User.findOne({
            email: email
        })
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }

    if (!user) {
        const err = new Error('User Not Found');
        err.statusCode = 404;
        return next(err);
    }
    let isEqual = false;

    try {
        isEqual = await bcrypt.compare(password, user.password);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!isEqual) {
        const err = new Error('Wrong Password');
        err.statusCode = 401;
        return next(err);
    }
    try {
        await User.findByIdAndDelete(user._id);
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 500;
        return next(err);
    }
    return res.status(200).json({
        message: 'User Deleted Successfully',
        statusCode: 200
    });
}

exports.login = async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    let user;
    try {
        user = await User.findOne({
            email: email
        });
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!user) {
        const err = new Error('User Not Found');
        err.statusCode = 404;
        return next(err);
    }
    let isEqual = false;

    try {
        isEqual = await bcrypt.compare(password, user.password);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!isEqual) {
        const err = new Error('Wrong Password');
        err.statusCode = 401;
        return next(err);
    }
    let token;
    try {
        token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, senstive.jwtSecret, {
            expiresIn: '1h'
        });
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    const session = new Session({
        token: token,
        userId: user._id.toString()
    });
    try {
        await session.save();
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    return res.status(200).json({
        message: 'User Logged In Successfully',
        statusCode: 200,
        token: token
    });
};

exports.logout = async function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the authorization header
    try {
        await Session.deleteOne({
            token: token
        });
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }

    return res.status(200).json({
        message: 'User Logged Out Successfully',
        statusCode: 200
    });
};

exports.getUser = async function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the authorization header

    let session;
    let user;
    try {
        session = await Session.findOne({
            token: token
        });
        user = await User.findById(session.userId).populate('taskList.list');
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!user) {
        const err = new Error('User Not Found');
        err.statusCode = 404;
        return next(err);
    }
    const sessionUser = {
        email: user.email,
        name: user.name,
        taskList: user.taskList
    }
    return res.status(200).json({
        message: 'User Found',
        statusCode: 200,
        user: sessionUser
    });
};