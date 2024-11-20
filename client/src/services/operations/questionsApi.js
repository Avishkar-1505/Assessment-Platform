import { toast } from "react-hot-toast"
import { setLoading } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector"
import { questionEndpoints } from "../apis"



const {
    GETALL_API,
    CREATE_QUE_API
} = questionEndpoints

export async function getQuestions(token) {


    const toastId = toast.loading("Loading...")
    setLoading(true)

    let questions = []
    
  
      try {
        const response = await apiConnector("POST", GETALL_API, {token}, {
          Authorization: `Bearer ${token}`,
        })
  
        console.log("GET QUESTIONS API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        response.data.allQuestions.map((que)=>{
            questions.push(que)
        })
  
      } catch (error) {
        console.log("GET ALL QUESTIONS API ERROR............", error)
        toast.error("Fetch Failed")
      }

      setLoading(false)
      toast.dismiss(toastId)
    
      return questions
  }

export function createQuestion(data, token) {

    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      
      try {
          const response = await apiConnector("POST", CREATE_QUE_API, data)
    
          console.log("CREATE QUESTION API RESPONSE............", response)
    
          if (!response.data.success) {
            // toast.dismiss(toastId)
            // dispatch(setLoading(false))
            throw new Error(response.data.message)
          }
          toast.success("Question Created")
      } 
      catch (error) {
          console.log("CREATE QUESTION API ERROR............", error.message )
          toast.error("Question Creation failed Failed")
      }

      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }