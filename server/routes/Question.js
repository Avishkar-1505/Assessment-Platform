const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")
const { createQuestion, updateQuestion, addQuestion, getAllQuestions } = require("../controllers/Questions")
const multer = require("multer")

const upload = multer({dest:"uploads/files"})

router.post("/createQuestion", upload.single("description"), createQuestion);
router.post("/addQuestion", addQuestion);
router.post("/updateQuestion", upload.single("description"), updateQuestion);
router.post("/getAllQuestions", auth, getAllQuestions);


module.exports = router