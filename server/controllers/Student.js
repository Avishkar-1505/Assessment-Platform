const Student = require("../models/Student");
const Test = require("../models/Test");

// create student and start test
exports.startTest = async(req, res) => {
    try{
        const { name, email, testId } = req.body;

        if(!name || !email || !testId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        const curTest = await Test.findOne({testId:testId}).populate("questions").exec();

        if(!curTest){
            return res.status(404).json({
                success:false,
                message: "Provided Test ID is invalid",
            })
        }

        if(curTest.enabled===false){
            return res.status(423).json({
                success:false,
                message: "Provided test is disabled by Instuctor",
            })
        }

        const checkPresent = await Student.findOne({email, testId: curTest._id});

        if(checkPresent){
            return res.status(200).json({
                success: true,
                data:{
                    test: curTest,
                    student: checkPresent
                }
            })
        }

        const newStudent = await Student.create({
            name, email, testId: curTest._id 
        })

        return res.status(200).json({
            success: true,
            data:{
                test: curTest,
                student: newStudent
            }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to start Test",
            error: err.message,
        });
    }
}


// submit test
exports.submitTest = async(req, res) => {
    try{

        const {name, email, testId, submissions} = req.body;

        const curStudent = await Student.findOneAndUpdate(
            {email, testId},
            {
                submittedAt:Date.now(),
                $push: { submissions: {$each: submissions}}
            },
            {new:true}
        ).populate("testId").exec()

        await Test.findByIdAndUpdate({_id:testId}, {$inc: {submissions: 1}});

        return res.status(200).json({
            success: true,
            message: "Test Submitted",
            curStudent
        })
        
        

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Submit Test",
            error: err.message,
        });
    }
}