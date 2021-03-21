const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    user: {
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