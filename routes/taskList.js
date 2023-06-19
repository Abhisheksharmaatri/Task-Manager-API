const express = require('express');

const router = express.Router();

const taskListController = require('../controllers/taskList');

router.post('/create', taskListController.createTaskList); //Tested

router.post('/update', taskListController.updateTaskList); //Tested

router.post('/delete', taskListController.deleteTaskList); // Tested

router.post('/addCollaborator', taskListController.addCollaborator); //Tested

router.post('/removeCollaborator', taskListController.removeCollaborator); //Tested

router.post('/addTask', taskListController.addTask); //Tested

router.post('/removeTask', taskListController.removeTask); //Tested

module.exports = router;