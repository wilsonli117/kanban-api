const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    buckets: [
        {
            type: String
        }
    ],
    tasks: []
}, {
    timestamps: true
})

module.exports = Board = mongoose.model("Board", BoardSchema);