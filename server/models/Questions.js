const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    testCases: [
        {
            input: {
                type: String
            },
            expectedOutput: {
                type: String
            }
        }
    ], 
    boilerplateCode: {
        type: String
    }

})

module.exports = mongoose.model("Question", questionSchema)