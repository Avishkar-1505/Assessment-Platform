const mongoose = require("mongoose")
const {
    randomBytes,
  } = require('crypto');

const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    testId: {
        type: String,
        unique: true
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor"        
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    testLink: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    submissions: {
        type: Number,
        default: 0
    },
    enabled: {
        type: Boolean,
        default: true
    }
})

testSchema.pre("save", async function(next){
    const id = randomBytes(4).toString("hex");
    this.testLink = `http://localhost:3000/tests/${id}`;
    this.testId = id;
    next();
});

module.exports = mongoose.model("Test", testSchema)