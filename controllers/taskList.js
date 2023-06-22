const mongoose = require('mongoose');


//Models
const Task = require('../models/task');
const TaskList = require('../models/taskList');
const User = require('../models/user');

//Working with lists
exports.createTaskList = async function (req, res, next) {
    const title = req.body.title;
    const description = req.body.description;

    const userId = req.body.userId;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        err.message = 'Server Error';
        next(err);
    }
    if (!user) {
        const err = new Error('User Not Found');
        return next(err);
    }
    const list = new TaskList({
        title: title,
        description: description,
        tasks: [],
        collaborators: []
    });
    let savedList;
    try {
        list.collaborators.push({
            userId: userId,
            status: 'author'
        });
        savedList = await list.save();
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    try {
        user.taskList.push({
            list: savedList._id,
            status: 'author'
        });
        await user.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 400;
        return next(err);
    }
    return res.status(201).json({
        message: 'Task List Created Successfully',
        statusCode: 201,
        list: savedList
    });
}

exports.updateTaskList = async function (req, res, next) {
    const listId = req.body.listId;
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.body.userId;

    let list;
    try {
        list = await TaskList.findById(listId).populate('collaborators');
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }

    if (!list) {
        const err = new Error('List Not Found');
        err.statusCode = 404;
        return next(err);
    }
    let collaborator;
    try {
        collaborator = await list.collaborators.find(collaborators => collaborators.userId.toString() === userId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!collaborator || collaborator.status !== 'author') {
        const err = new Error('Unauthorized');
        return next(err);
    }
    if (title) {
        list.title = title;
    }
    if (description) {
        list.description = description;
    }
    let savedList;
    try {
        savedList = await list.save();
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    return res.status(201).json({
        message: 'Task List Updated Successfully',
        statusCode: 201,
        list: savedList
    });
};


exports.deleteTaskList = async function (req, res, next) {
    const listId = req.body.listId;
    const userId = req.body.userId;
    let list;
    try {
        list = await TaskList.findById(listId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!list) {
        const err = new Error('List Not Found');
        err.statusCode = 404;
        return next(err);
    }
    let collaborator;
    try {
        collaborator = list.collaborators.find(collaborators => collaborators.userId.toString() === userId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }

    if (!collaborator || collaborator.status !== 'author') {
        const err = new Error('Unauthorized');
        return next(err);
    }
    try {
        for (const collaborator of list.collaborators) {
            const user = await User.findById(collaborator.userId).populate('taskList');
            user.taskList.pull({
                list: listId
            });
            await user.save();
        }
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    try {
        for (const task of list.tasks) {
            await Task.findByIdAndDelete(task.task);
        }
    } catch (err) {
        err.message = 'Something went wrong';
        err.statusCode = 400;
        return next(err);
    }

    try {
        await TaskList.findByIdAndDelete(listId);
    } catch (err) {
        err.message = 'Something went wrong';
        err.statusCode = 400;
        return next(err);
    }
    return res.status(201).json({
        message: 'Task List Deleted Successfully',
        statusCode: 201,
    });
};

//Working with Collaborators
exports.addCollaborator = async function (req, res, next) {
    const listId = req.body.listId;
    const collaboratorId = req.body.collaboratorId;
    const status = req.body.status;

    let list;
    try {
        list = await TaskList.findById(listId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }

    if (!list) {
        const err = new Error('List Not Found');
        err.statusCode = 404;
        return next(err)
    }

    try {
        list.collaborators.push({
            userId: collaboratorId,
            status: status
        });
        await list.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 400;
        return next(err);
    }
    try {
        const user = await User.findById(collaboratorId).populate('taskList');
        user.taskList.push({
            list: listId,
            status: status
        });
        await user.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 400;
        return next(err);
    }

    return res.status(201).json({
        message: 'Collaborator added Successfully',
        statusCode: 201,
        list: list
    });

};

exports.removeCollaborator = async function (req, res, next) {
    const listId = req.body.listId;
    const collaboratorId = req.body.collaboratorId;
    let list;
    try {
        list = await TaskList.findById(listId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!list) {
        const err = new Error('List Not Found');
        err.statusCode = 404;
        return next(err);
    }

    try {
        list.collaborators.pull({
            userId: collaboratorId
        });
        await list.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 400;
        return next(err);
    }

    try {
        const user = await User.findById(collaboratorId).populate('taskList');
        user.taskList.pull({
            list: listId
        });
        await user.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 400;
        return next(err);
    }

    return res.status(201).json({
        message: 'Collaborator removed Successfully',
        statusCode: 201,
        list: list
    });
};


//Working with Tasks
exports.addTask = async function (req, res, next) {
    const listId = req.body.listId;
    const title = req.body.title;
    const description = req.body.description;
    let list;
    try {
        list = await TaskList.findById(listId).populate('tasks');
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    if (!list) {
        const err = new Error('List Not Found');
        err.statusCode = 404;
        return next(err);
    }
    const task = new Task({
        title: title,
        description: description,
        status: 'todo',
        collaborators: [],
        userId: req.body.userId,
        listId: listId
    });
    let savedTask;
    try {
        savedTask = await task.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 500;
        return next(err);
    }
    try {
        list.tasks.push({
            task: savedTask._id.toString(),
            status: 'todo'
        });
        await list.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 400;
        return next(err);
    }
    return res.status(201).json({
        message: 'Task created Successfully',
        statusCode: 201,
        task: savedTask,
        list: list
    });
};

exports.removeTask = async function (req, res, next) {
    const listId = req.body.listId;
    const taskId = req.body.taskId;
    let list, task;
    try {
        list = await TaskList.findById(listId).populate('tasks');
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }

    if (!list) {
        const err = new Error('List Not Found');
        err.statusCode = 404;
        return next(err);
    }
    if (!task) {
        const err = new Error('Task Not Found');
        err.statusCode = 404;
        return next(err);
    }
    if (list.tasks.findIndex(task => task.task._id.toString() === taskId) === -1) {
        const err = new Error('Task Not Found');
        err.statusCode = 404;
        return next(err);
    }
    try {
        list.tasks.pull({
            task: taskId
        });
        await list.save();
    } catch (err) {
        err.message = 'Server Error';
        err.statusCode = 400;
        return next(err);
    }
    try {
        await Task.findByIdAndDelete(taskId);
    } catch (err) {
        err.message = 'Server Error';
        return next(err);
    }
    return res.status(201).json({
        message: 'Task deleted Successfully',
        statusCode: 201,
        list: list
    });
};