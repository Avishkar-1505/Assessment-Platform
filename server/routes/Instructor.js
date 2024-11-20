const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth")
const {signUp, login, getResults, getDetails } = require("../controllers/Instructor")

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/getResults", auth, getResults)
router.get("/getDetails", auth, getDetails)

module.exports = router