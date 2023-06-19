const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [{
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        },
        status: String
    }],
    collaborators: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: String
    }]
});

module.exports = mongoose.model('Task-List', taskListSchema);