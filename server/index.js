const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose  = require("mongoose");
dotenv.config();

const app = express();

const questionRoutes = require("./routes/Question");
const submissionRoutes = require("./routes/Submission");

const instructorRoutes = require("./routes/Instructor");

const testRoutes = require("./routes/Test");
const studentRoutes = require("./routes/Student")

const port = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

// app.use("/uploads/profiles", express.static("uploads/profiles"))

app.use(cookieParser());
app.use(express.json());


app.use("/uploads/files", express.static("uploads/files"))


app.use("/api/v1/question", questionRoutes)
app.use("/api/v1/submission", submissionRoutes)
app.use("/api/v1/instructor", instructorRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/student",studentRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running"
    })
})

const server = app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
})



mongoose.connect(databaseURL).then(()=>console.log(`DB connection successful.`));
