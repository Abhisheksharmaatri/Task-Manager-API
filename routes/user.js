const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/create', userController.createUser); //Tested

router.post('/update', userController.updateUser); //Tested

router.post('/delete', userController.deleteUser); //Tested

router.post('/login', userController.login); //Tested

router.post('/logout', userController.logout); //Tested

router.post('/getUser', userController.getUser); //Tested


module.exports = router;