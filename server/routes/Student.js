const express = require("express");
const router = express.Router();

const {startTest, submitTest } = require("../controllers/Student");

router.post("/startTest", startTest);
router.post("/submitTest", submitTest);

module.exports = router;