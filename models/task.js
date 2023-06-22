const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due: {
        type: Date
    },
    priority: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'TaskList',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', taskSchema);