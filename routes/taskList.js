const express = require('express');

const router = express.Router();

const taskListController = require('../controllers/taskList');

router.post('/create', taskListController.createTaskList); //Tested

router.post('/update', taskListController.updateTaskList); //Tested

router.post('/delete', taskListController.deleteTaskList); // Tested

router.post('/add-collaborator', taskListController.addCollaborator); //Tested

router.post('/remove-collaborator', taskListController.removeCollaborator); //Tested

router.post('/addTask', taskListController.addTask); //Tested

router.post('/removeTask', taskListController.removeTask); //Tested

module.exports = router;