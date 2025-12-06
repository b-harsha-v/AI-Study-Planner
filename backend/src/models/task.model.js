import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
        type: String,
        required: true,
        },
        description: String,
        dueDate: Date,
        status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "backlog"],
        default: "pending",
        },
        priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
        }
    },
    { timestamps: true}
);

export default mongoose.model("Task", taskSchema);