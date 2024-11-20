const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const instructorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdTests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test"
        }
    ]
})

instructorSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model("Instructor", instructorSchema)