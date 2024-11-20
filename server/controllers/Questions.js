const Question = require("../models/Questions");
const {renameSync} = require("fs");
require("dotenv").config();

exports.createQuestion = async (req, res) => {
    try{
        let {title, testCases} = req.body;
        let description = req.file;
        

        console.log(description.originalname)
        console.log("testCases", testCases);
        console.log("title", title)

        if(!title || !testCases || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        

        if(testCases.length === 0){
            return res.status(400).json({   
                success: false,
                message: "Test Case cannot be empty",
            });
        }

        const date = Date.now();
        let fileName = "uploads/files/" + date + description.originalname;
        renameSync(description.path, fileName);

        const newQuestion = await Question.create({
            title,
            description: fileName,
            testCases: testCases
        })

        return res.status(200).json({
            success: true,
            message: "Question Created successfully",
            data: newQuestion,
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create question",
            error: err.message,
        });
    }
    
}

exports.addQuestion = async(req, res) => {
    try{
        let {title, testCases} = req.body;
        // let description = req.file;
        

        // console.log(description.originalname)
        console.log("testCases", testCases);
        console.log("title", title)

        if(!title || !testCases){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        

        if(testCases.length === 0){
            return res.status(400).json({   
                success: false,
                message: "Test Case cannot be empty",
            });
        }

        // const date = Date.now();
        // let fileName = "uploads/files/" + date + description.originalname;
        // renameSync(description.path, fileName);

        const newQuestion = await Question.create({
            title,
            testCases
        })

        return res.status(200).json({
            success: true,
            message: "Question Created successfully",
            data: newQuestion,
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to add question",
            error: err.message,
        });
    }
}

exports.updateQuestion = async(req, res) => {
    try{
        let {title} = req.body;
        let description = req.file;

        if(!title || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }


        const date = Date.now();
        let fileName = "uploads/files/" + date + description.originalname;
        renameSync(description.path, fileName);

        const updatedQuestion = await Question.findOneAndUpdate({title}, {description:fileName}, {new:true});

        return res.status(200).json({
            success: true,
            message: "Question Updated",
            updatedQuestion
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to update question",
            error: err.message,
        });
    }
}

//getAllQuestions
exports.getAllQuestions = async(req, res) => {
    try{
        const allQuestions = await Question.find({}, {_id:true, title:true})

        return res.status(200).json({
            success: true,
            message: "All question titles fetched",
            allQuestions
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch questions",
            error: err.message,
        });
    }
}

//getQuestions


