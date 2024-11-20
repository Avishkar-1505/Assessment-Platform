import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"
import { setStudent } from "../../slices/studentSlice";
import { setTest, setQuestions, setLoading } from "../../slices/testSlice";

const {START_TEST_API, SUBMIT_TEST_API} = studentEndpoints

export function startTest(
    name, email, testId, navigate
) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")
        let curTestId
        try{
            const response = await apiConnector("POST", START_TEST_API, {
               name, email, testId
            })

            console.log("START TEST RESPONSE............", response)

            if (!response.data.success) {
                dispatch(setLoading(false))
                toast.dismiss(toastId)
                throw new Error(response.data)
            }
            dispatch(setStudent(response.data.data.student))
            dispatch(setTest(response.data.data.test))
            dispatch(setQuestions(response.data.data.test.questions))
            localStorage.setItem("student", JSON.stringify(response.data.data.student))
            localStorage.setItem("questions", JSON.stringify(response.data.data.test.questions))
            localStorage.setItem("test", JSON.stringify(response.data.data.test))
            curTestId = response.data.data.test._id
            

        }catch(error){
            toast.dismiss(toastId)
            dispatch(setLoading(false))
            console.log("START TEST API ERROR............", error)
            toast.error("Start Test Failed")
        }

        toast.dismiss(toastId)
        dispatch(setLoading(false))
        navigate(`/test/${curTestId}`)
    }
}


export function submitTest(
    name, email, testId, submissions, navigate
) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")

        try{
            const response = await apiConnector("POST", SUBMIT_TEST_API, {
                name, email, testId, submissions
            })

            console.log("SUBMIT TEST RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data)
            }
            
            dispatch(setStudent(null))
            dispatch(setTest(null))
            dispatch(setQuestions(null))
            localStorage.removeItem("student")
            localStorage.removeItem("questions")
            localStorage.removeItem("test")
            toast.dismiss(toastId)
            toast.success("Success")

            navigate("/test-end")

        }catch(error){
            toast.dismiss(toastId)
            console.log("SUBMIT TEST API ERROR............", error)
            toast.error("Finist Test Failed")
        }
    }
}