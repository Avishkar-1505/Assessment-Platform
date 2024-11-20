const mongoose = require("mongoose")

const submissionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    code: {
        type: String,
    },
    language: {
        type: Number,
    },
    tokens: {
        type: String
    },
    results: [
        {
            testCase: {
                type: Number,
            },
            result: {
                type: String
            }
        }
    ],
    submittedAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("Submission", submissionSchema)