const Student = require("../models/Student");
const Submission = require("../models/Submission")
const axios = require('axios');
require("dotenv").config();

// exports.runTest = async(req, res) => {
//     try{
//         const {testId, questionId, code, language, testCases} = req.body;

//         console.log(testCases)

//         if(!testId || !questionId || !code || !language || !testCases){
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             })
//         }

//         const headers = {
//             'Content-Type': 'application/json',
//             'X-RapidAPI-Key': process.env.JUDGE0_KEY,
//             'X-RapidAPI-Host': process.env.JUDGE0_HOST
//         }

//         let submissions = []
//         for(let i=0;i<testCases.length;i++){
//             const cur = {
//                 language_id: language,
//                 source_code: code,
//                 stdin: testCases[i].input,
//                 expected_output: testCases[i].expectedOutput,
//             }

//             submissions.push(cur);
//         }

//         console.log(submissions);

//         const batchSubmissions = {
//             submissions
//         };

//         console.log("batch Submissions", batchSubmissions)

//         const response = await axios.post(process.env.JUDGE0_URL, batchSubmissions, {headers});

//         console.log(response.data);

        
//         let tokens = ""
//         response.data.map((obj)=>{
//             tokens += obj.token
//             tokens += ','
//         })
//         tokens = tokens.slice(0, -1);

//         let getURL = `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokens}&base64_encoded=false&wait=true`

//         const subResponse = await axios.get(getURL, {headers});

//         console.log(subResponse.data);

//         return res.status(200).json({
//             success: true,
//             message: "Test run successful",
//             data: {
//                 response: response.data, 
//                 results: subResponse.data
//             }
//         })

//     }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to Run test",
//             error: err.message,
//         });
//     }

// }


exports.runTest = async (req, res) => {
    try {
        let { testId, questionId, code, language, testCases } = req.body;

        // console.log("testId", testId);
        // console.log("questionId", questionId);
        // console.log("code", code);
        // console.log("language", language);
        // console.log("testCases", testCases);

        if (!testId || !questionId || !code || !language || !testCases) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const headers = {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.JUDGE0_KEY,
            "X-RapidAPI-Host": process.env.JUDGE0_HOST,
        };

        // Prepare submissions
        let submissions = testCases.map((testCase) => ({
            language_id: language,
            source_code: code,
            stdin: testCase.input,
            expected_output: testCase.expectedOutput,
        }));

        const batchSubmissions = { submissions };

        // Submit the batch to Judge0
        const response = await axios.post(process.env.JUDGE0_URL, batchSubmissions, { headers });
        const tokens = response.data.map((obj) => obj.token).join(",");

        // Polling to ensure all submissions are complete
        const getSubmissionsResults = async () => {
            const getURL = `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokens}&base64_encoded=false`;

            const subResponse = await axios.get(getURL, { headers });
            const results = subResponse.data.submissions;

            const allCompleted = results.every(
                (result) => result.status.id !== 1 && result.status.id !== 2 // "In Queue" or "Processing"
            );

            return { allCompleted, results };
        };

        // Polling logic
        const MAX_ATTEMPTS = 10; // Maximum polling attempts
        const POLL_INTERVAL = 2000; // 2 seconds interval between polls
        let attempts = 0;
        let pollResults;

        while (attempts < MAX_ATTEMPTS) {
            pollResults = await getSubmissionsResults();

            if (pollResults.allCompleted) {
                break;
            }

            attempts++;
            await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
        }

        // Check if submissions were not completed within the timeout
        if (!pollResults.allCompleted) {
            return res.status(408).json({
                success: false,
                message: "Test run timed out. Some submissions are still processing.",
            });
        }

        // Return the results
        return res.status(200).json({
            success: true,
            message: "Test run completed successfully",
            data: pollResults.results,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to run test",
            error: err,
        });
    }
};




exports.createSubmission = async(req, res) => {
    try{
        const {studentId, testId, questionId, code, language, testCases} = req.body
        if(!studentId || !testId || !questionId || !code || !language || !testCases){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // check if submisssion already present (same studentId, testId and questionId) if yes only update submission result

        const query = {
            studentId,
            testId,
            questionId
        };

        const present = await Submission.findOne(query);
        
        
        console.log(testCases)

        const headers = {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.JUDGE0_KEY,
            'X-RapidAPI-Host': process.env.JUDGE0_HOST
        }

        let submissions = []
        for(let i=0;i<testCases.length;i++){
            const cur = {
                language_id: language,
                source_code: code,
                stdin: testCases[i].input,
                expected_output: testCases[i].expectedOutput,
            }

            submissions.push(cur);
        }

        console.log(submissions);

        const batchSubmissions = {
            submissions
        };

        console.log("batch Submissions", batchSubmissions)

        const response = await axios.post(process.env.JUDGE0_URL, batchSubmissions, {headers});



        console.log(response.data);

        
        let tokens = ""
        response.data.map((obj)=>{
            tokens += obj.token
            tokens += ','
        })
        tokens = tokens.slice(0, -1);

        let getURL = `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokens}&base64_encoded=false&wait=true`

        const subResponse = await axios.get(getURL, {headers});

        console.log(subResponse.data);

        let results = []

        for(let i=0;i<subResponse.data.submissions.length;i++){
            console.log(i+1, " ", subResponse.data.submissions[i].status.description)
            let cur = {
                testCase: i+1,
                result: subResponse.data.submissions[i].status.description
            }
            results.push(cur);
        }

        console.log("results", results)

        if(present){
            const updatedSubmission = await Submission.findByIdAndUpdate(present._id, {code, language, results, tokens}, {new:true})

        

            return res.status(200).json({
                success: true,
                message: "Submission Created successfully",
                data: {
                    submission: updatedSubmission,
                    results: subResponse.data
                }
            })
        }


        const newSubmission = await Submission.create({
            studentId,
            testId,
            questionId,
            code,
            language,
            tokens,
            results
        })

        return res.status(200).json({
            success: true,
            message: "Submission Created successfully",
            data: {
                submission: newSubmission,
                results: subResponse.data
            }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create Submission",
            error: err.message,
        });
    }
}

exports.updateSubmissions = async(req, res) => {
    try{
        const {submissionId} = req.body;

        if(!submissionId.length){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.JUDGE0_KEY,
            'X-RapidAPI-Host': process.env.JUDGE0_HOST
        }

        for(let i=0;i<submissionId.length;i++){
            const sub = await Submission.findById(submissionId[i])
            console.log(sub.tokens)


            let getURL = `https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${sub.tokens}&base64_encoded=false&wait=true`

            const subResponse = await axios.get(getURL, {headers});

            console.log(subResponse.data);

            let results = []

            for(let i=0;i<subResponse.data.submissions.length;i++){
                console.log(i+1, " ", subResponse.data.submissions[i].status.description)
                let cur = {
                    testCase: i+1,
                    result: subResponse.data.submissions[i].status.description
                }
                results.push(cur);
            }

            console.log("results", results)

            await Submission.findByIdAndUpdate(submissionId[i], {results})

        }

        return res.status(200).json({
            success: true,
            message: "Submission updated successfully",
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to update Submission",
            error: err.message,
        });
    }
}
