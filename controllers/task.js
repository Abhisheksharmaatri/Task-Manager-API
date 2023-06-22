const mongoose = require('mongoose');

//Models
const Task = require('../models/task');

exports.createTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;
    const listId = req.body.listId;
    const userId = req.body.userId;

    const task = new Task({
        title: title,
        description: description,
        due: dueDate,
        userId: userId,
        listId: listId
    });
    let savedTask;
    try {
        savedTask = task.save();
    } catch (err) {
        err.message = 'Task Not Saved';
        next(err);
    }
    return res.status(201).json({
        message: 'Task Created Successfully',
        statusCode: 201,
        task: savedTask
    });
};
exports.updateTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;

    const taskId = req.body.taskId;
    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    if (!task) {
        const error = new Error('Server Error');
        error.statusCode = 404;
        return next(error);
    }

    if (title) {
        task.title = title;
    }
    if (description) {
        task.description = description;
    }
    if (dueDate) {
        task.dueDate = dueDate;
    }

    let savedTask;
    try {
        savedTask = await task.save();
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    return res.status(201).json({
        message: 'Task Updated Successfully',
        statusCode: 201,
        task: savedTask
    });
};

exports.deleteTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const taskId = req.body.taskId;
    const userId = req.body.userId;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    if (!task) {
        const error = new Error('Task not Found');
        error.statusCode = 404;
        return next(error);
    }
    if (task.userId.toString() !== userId.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    try {
        task = await Task.findByIdAndRemove(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    return res.status(200).json({
        message: 'Task Deleted Successfully',
        statusCode: 200,
        task: task
    });
};

exports.getTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const taskId = req.body.taskId;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    if (!task) {
        const error = new Error('Task not Found');
        error.statusCode = 404;
        return next(error);
    }
    if (task.userId.toString() !== userId.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    return res.status(200).json({
        message: 'Task Found',
        statusCode: 200,
        task: task
    });
};

exports.getAllTasks = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const userId = req.body.userId;
    let tasks;

    try {
        tasks = await Task.find({
            userId: userId
        });
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    return res.status(200).json({
        message: 'Tasks Found',
        statusCode: 200,
        tasks: tasks
    });
};

exports.addPriorityTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const taskId = req.body.taskId;
    const userId = req.body.userId;
    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    if (!task) {
        const error = new Error('Task not Found');
        error.statusCode = 404;
        return next(error);
    }
    if (task.userId.toString() !== userId.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    task.priority = true;

    let savedTask;
    try {
        savedTask = await task.save();
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    return res.status(200).json({
        message: 'Task Priority Added',
        statusCode: 200,
        task: savedTask
    });
}

exports.removePriorityTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const taskId = req.body.taskId;
    const userId = req.body.userId;
    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    if (!task) {
        const error = new Error('Task not Found');
        error.statusCode = 404;
        return next(error);
    }
    if (task.userId.toString() !== userId.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    task.priority = false;

    let savedTask;
    try {
        savedTask = await task.save();
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    return res.status(200).json({
        message: 'Task Priority Removed',
        statusCode: 200,
        task: savedTask
    });
}

exports.getPriorityTasks = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const userId = req.body.userId;
    let tasks;
    try {
        tasks = await Task.find({
            priority: true,
            userId: userId
        });
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }

    return res.status(200).json({
        message: 'Priority Tasks Found',
        statusCode: 200,
        tasks: tasks
    });
}

exports.completeTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const taskId = req.body.taskId;
    const userId = req.body.userId;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    if (task.userId.toString() !== userId.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }
    task.completed = true;
    let savedTask;
    try {
        savedTask = await task.save();
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    return res.status(200).json({
        message: 'Task Completed',
        statusCode: 200,
        task: savedTask
    });
};
exports.uncompleteTask = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const taskId = req.body.taskId;
    const userId = req.body.userId;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    if (task.userId.toString() !== userId.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }
    task.completed = false;
    let savedTask;
    try {
        savedTask = await task.save();
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    return res.status(200).json({
        message: 'Task uncompleted',
        statusCode: 200,
        task: savedTask
    });
};

exports.getCompletedTasks = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const userId = req.body.userId;
    let tasks;
    try {
        tasks = await Task.find({
            completed: true,
            userId: userId
        });
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    return res.status(200).json({
        message: 'Completed Tasks Found',
        statusCode: 200,
        tasks: tasks
    });
};

exports.getUncompletedTasks = async function (req, res, next) {
    if (!req.auth) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        return next(error);
    }

    const userId = req.body.userId;
    let tasks;
    try {
        tasks = await Task.find({
            completed: false,
            userId: userId
        });
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    return res.status(200).json({
        message: 'Uncompleted Tasks Found',
        statusCode: 200,
        tasks: tasks
    });
};