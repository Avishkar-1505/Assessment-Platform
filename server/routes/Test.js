const express = require("express")
const router = express.Router()

const {auth} = require("../middlewares/auth")
const {createTest, disableTest, getTest, enableTest} = require("../controllers/Test")

router.post("/createTest", auth, createTest);
router.post("/disableTest", auth, disableTest);
router.post("/enableTest", auth, enableTest)
router.post("/getTest", auth, getTest);

module.exports = router