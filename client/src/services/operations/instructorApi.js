import { toast } from "react-hot-toast"
import { setToken, setUser, setLoading } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector"
import { instructorEndpoints } from "../apis"

const {
    SIGNUP_API,
    LOGIN_API,
    RESULTS_API,
    GET_DETAILS
} = instructorEndpoints

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
              firstName,
              lastName,
              email,
              password,
            })
      
            console.log("SIGNUP API RESPONSE............", response)
      
            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/signup")
        } 
        catch (error) {
            console.log("SIGNUP API ERROR............", error.message )
            toast.error("Signup Failed")
            navigate("/signup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.instructor))
        localStorage.setItem("user", JSON.stringify(response.data.instructor))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
      }
}

export function getDetails(token) {

  let results = []
  return async (dispatch) => {

    try {
      const response = await apiConnector("GET", GET_DETAILS, {token}, {
        Authorization: `Bearer ${token}`,
      })

      console.log("GET DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      dispatch(setUser(response.data.instDetails))
      localStorage.setItem("user", JSON.stringify(response.data.instDetails))
    } catch (error) {
      console.log("API ERROR............", error)
      toast.error("Fetch Failed")
    }
  }
}

export async function getResults(testId, token) {

    let results = []

    try {
      const response = await apiConnector("POST", RESULTS_API, {testId, token}, {
        Authorization: `Bearer ${token}`,
      })

      console.log("GET RESULTS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      response.data.students.map((student)=>{
        results.push(student)
      })

    } catch (error) {
      console.log("GET RESULTS API ERROR............", error)
      toast.error("Fetch Failed")
    }

    return results
  
}