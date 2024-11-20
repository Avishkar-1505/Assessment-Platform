const Instructor = require("../models/Instructor");
const Student = require("../models/Student")
// const Test = require("../models/Test");
const Submission = require("../models/Submission");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//create instructor (signup) (login)
exports.signUp = async (req, res) => {
    try {

        //data fetch from request
        let { firstName, lastName, email, password } = req.body

        // console.log(firstName, lastName, email, password)

        //validation
        if(!firstName || !lastName || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }


        //check if user already exists
        const existingUser = await Instructor.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "Instructor is already registered",
            });
        }



        //Hash Password
        // const hashedPassword = await bcrypt.hash(password, 10);


        const newInstructor = await Instructor.create({
            firstName,
            lastName,
            email,
            password
        })

        //return response
        return res.status(200).json({
            success: true,
            message: "instructor Registered Successfully",
            instructor: newInstructor
        });

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured while user registration, Please try again"
        })
    }
}

//login

exports.login = async (req, res) => {
    try{
        //get data fron request
        const {email, password} = req.body;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        //user check if exists
        const instructor = await Instructor.findOne({email}).populate({
            path: 'createdTests', // Populate created_tests (Test documents)
            populate: {
                path: 'questions', // Nested populate for questions array in each Test
                model: 'Question' // Specify the Question model if not auto-detected
            }
        })
        if(!instructor) {
            return res.status(401).json({
                success: false,
                message: "Instructor is not registered, please sign up first",
            })
        }

        //generate JWT, after password matching
        if(await bcrypt.compare(password, instructor.password)) {
            const payload = {
                email: instructor.email,
                id: instructor._id,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            instructor.token = token;
            instructor.password = undefined;


            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),   
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                instructor,
                message: "User Login Successful"
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect",
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Login faliure please try again",
            error: err
        })
    }   
};



// getResults (aggegrate acc. to testId, student, submission)
// testId -> related student -> testId and studentId related submissions -> aggerate according to studentId and submission

exports.getResults = async(req, res) => {
    try {
        const { testId } = req.body;
    
        const students = await Student.find({testId}).populate({
            path: "submissions",
            populate: {
                path: 'questionId', // Nested populate for questions array in each Test
                model: 'Question' // Specify the Question model if not auto-detected
            }

        });
        console.log(students);
    
        if (students.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: 'No submissions found for this test' 
            });
        }
    
        // find submissions of each student
        // const testResults = await Promise.all(
        //     students.map(async (studentId) => {

        //         // Find the student's submissions for the test
        //         const submissions = await Submission.find({
        //         studentId,
        //         testId
        //         }).populate('questionId'); 
        
        //         // Aggregate the student's results for each question
        //         const studentResults = submissions.map(submission => ({
        //             question: submission.questionId, 
        //             code: submission.code,
        //             language: submission.language,
        //             results: submission.results,
        //             submittedAt: submission.submittedAt,
        //         }));
        
                
        //         const student = await Student.findById(studentId);
        
        //         return {
        //             student: {
        //                 id: student._id,
        //                 name: student.name,
        //                 email: student.email
        //             },
        //             submissions: studentResults
        //         };
        //     })
        // );
    
        //Return aggregated test results
        return res.status(200).json({
            success: true,
            message: 'Test results fetched successfully',
            students
        });
      }catch (err) {
            console.error('Error fetching test results:', err);
            res.status(500).json({
                success: false,
                message: 'Error fetching test results',
                error: err
            });
      }
    
}

exports.getDetails = async(req, res) => {
    try{
        const id = req.user.id
        const instDetails = await Instructor.findById(id).populate({
            path: 'createdTests', // Populate created_tests (Test documents)
            populate: {
                path: 'questions', // Nested populate for questions array in each Test
                model: 'Question' // Specify the Question model if not auto-detected
            }
        }).exec()

        if(!instDetails){
            return res.status(401).json({
                success: false,
                message: "Instructor is not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            instDetails,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
