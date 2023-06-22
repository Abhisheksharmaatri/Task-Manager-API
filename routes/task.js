const express = require('express');

const taskController = require('../controllers/task');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth.authUser, taskController.createTask); // Tested

router.post('/update', auth.authUser, taskController.updateTask); //Tested

router.post('/delete', auth.authUser, taskController.deleteTask); //Tested

router.post('/get', auth.authUser, taskController.getTask); //Tested

router.post('/get-all', auth.authUser, taskController.getAllTasks);

//Priotiry task
router.post('/add-priority', auth.authUser, taskController.addPriorityTask); //Tested

//Remove priority task
router.post('/remove-priority', auth.authUser, taskController.removePriorityTask); //Tested

//Get priority tasks
router.post('/get-priority', auth.authUser, taskController.getPriorityTasks); //Tested

//Complete task
router.post('/complete', auth.authUser, taskController.completeTask); //Tested

//Uncomplete task
router.post('/uncomplete', auth.authUser, taskController.uncompleteTask); //Tested

//Get uncompleted tasks
router.post('/get-uncompleted', auth.authUser, taskController.getUncompletedTasks); //Tested

//Get completed tasks
router.post('/get-completed', auth.authUser, taskController.getCompletedTasks); //Tested


module.exports = router;