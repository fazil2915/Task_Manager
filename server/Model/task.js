import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    taskOwner: {
        type: Schema.Types.String, ref: "User",
        required: true
    },

}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema);
export default Task;