const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Test"
    },
    startedAt: {
        type: Date,
        default: Date.now()
    },
    submittedAt: {
        type: Date,
    },
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Submission"
        }
    ]
})


module.exports = mongoose.model("Student", studentSchema)