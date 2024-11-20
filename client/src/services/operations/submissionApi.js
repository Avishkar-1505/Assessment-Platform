import { toast } from "react-hot-toast"
import { setLoading } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector"

import {submissionEndpoints} from "../apis"
import { addSubmission } from "../../slices/studentSlice";

const {
    RUN_TEST_API,
    SUBMISSION_API,
    UPDATE_SUBMISSIONS_API
} = submissionEndpoints


export async function runTest(testId, questionId, code, language, testCases) {
    const toastId = toast.loading("Loading...")
    let results = [];

    try{

        const response = await apiConnector("POST", RUN_TEST_API, {testId, questionId, code, language, testCases});
        
        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.dismiss(toastId)
        toast.success("Success")
        response.data.data.map((res)=>{
            results.push(res)
        })

    }catch(error){
        toast.dismiss(toastId)
        console.log("RUN TEST API ERROR............", error)
        toast.error("Run test Failed")
    }

    
    return results
}

export function createSubmission(
    studentId, testId, questionId, code, language, testCases
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", SUBMISSION_API, {
                studentId, testId, questionId, code, language, testCases
            })

            console.log("CREATE SUBMISSIONS RESPONSE............", response)

            if (!response.data.success) {
                toast.dismiss(toastId)
                throw new Error(response.data.message)
            }
            dispatch(addSubmission(response.data.data.submission._id))
            toast.dismiss(toastId)
            toast.success("Success")

        }catch(error){
            toast.dismiss(toastId)
            console.log("CREATE SUBMISSIONS API ERROR............", error)
            toast.error("Submission Failed")
        }
    }
}


export function updateSubmissions(
    submissionId
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST", UPDATE_SUBMISSIONS_API, {
               submissionId
            })

            console.log("UPDATE SUBMISSIONS RESPONSE............", response)

            if (!response.data.success) {
                dispatch(setLoading(false))
                toast.dismiss(toastId)
                throw new Error(response.data.message)
            }
            dispatch(setLoading(false))
            toast.dismiss(toastId)

        }catch(error){
            toast.dismiss(toastId)
            dispatch(setLoading(false))
            console.log("UPDATE SUBMISSIONS API ERROR............", error)
            toast.error("Update Failed")
        }
    }
}