const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamp: true
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;