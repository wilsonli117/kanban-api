const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    board_id: {
        type: String,
        required: true
    },
    bucket: {
        type: String,
        required: true
    },
    assigned_id: {
        type: String
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})