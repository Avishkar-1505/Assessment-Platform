const Test = require("../models/Test");
const Instructor = require("../models/Instructor");
require("dotenv").config();

// createTest

exports.createTest = async(req, res) => {
    try{
        const {testName, instructorId, questions} = req.body

        if(!testName || !instructorId || !questions || questions.length==0){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const createdTest = await Test.create({
            testName,
            instructorId,
            questions
        })

        console.log(createdTest);

        await Instructor.findByIdAndUpdate(instructorId, {$push:{createdTests:createdTest._id}}, {new:true})


        return res.status(200).json({
            success: true,
            message: "Test Created successfully",
            createdTest
        }) 
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create Test",
            error: err.message
        });
    }
}

// disableTest

exports.disableTest = async(req, res) => {
    try{
        const {testId, testName, instructorId} = req.body

        if(!testId || !testName || !instructorId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newStatus = await Test.findByIdAndUpdate(testId, {enabled: false}, {new:true}).populate("questions")

        console.log(newStatus);

        return res.status(200).json({
            success: true,
            message: "Test has been disabled",
            newStatus
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to disable Test",
            error: err.message
        });
    }
}

exports.enableTest = async(req, res) => {
    try{
        const {testId, testName, instructorId} = req.body

        if(!testId || !testName || !instructorId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newStatus = await Test.findByIdAndUpdate(testId, {enabled: true}, {new:true}).populate("questions")

        console.log("newStatus",newStatus);

        return res.status(200).json({
            success: true,
            message: "Test has been enabled",
            newStatus
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Enable Test",
            error: err.message
        });
    }
}

exports.getTest = async(req, res) => {
    try{
        const {testId} = req.body;

        // console.log(testId)

        if(!testId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const curTest = await Test.findById(testId).populate("questions");

        if(!curTest){
            return res.status(400).json({
                success: false,
                message: "Test not found"
            })
        }

        return res.status(200).json({
            success: true,
            curTest
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Fetch Test",
            error: err.message
        });
    }
}

