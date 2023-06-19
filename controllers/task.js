const mongoose = require('mongoose');

//Models
const Task = require('../models/task');

exports.createTask = async function (req, res, next) {
    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;


    const task = new Task({
        title: title,
        description: description,
        due: dueDate
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

    return res.status(200).json({
        message: 'Task Found',
        statusCode: 200,
        task: task
    });
};