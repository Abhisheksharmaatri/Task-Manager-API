const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    taskList: [{
        list: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task-List'
        },
        status: String
    }]
});

module.exports = mongoose.model('User', userSchema);