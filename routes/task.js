const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

router.post('/create', taskController.createTask); // Tested

router.post('/update', taskController.updateTask); //Tested

router.post('/delete', taskController.deleteTask); //Tested

router.post('/get', taskController.getTask); //Tested

module.exports = router;