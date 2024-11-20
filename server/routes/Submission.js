const express = require("express")
const router = express.Router()

const { runTest, createSubmission, updateSubmissions } = require("../controllers/Submission")

// console.log(runTest)

router.post("/runTest", runTest);
router.post("/createSubmission", createSubmission);
router.post("/updateSubmissions", updateSubmissions);

module.exports = router