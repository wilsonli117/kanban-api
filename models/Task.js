const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    board_id: {
        type: String,
        required: true
    },
    bucket: {
        type: String,
        required: true
    },
    assigned_id: {
        type: String,
        default: null
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = Task = mongoose.model("Task", TaskSchema);