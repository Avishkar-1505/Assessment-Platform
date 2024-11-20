import { toast } from "react-hot-toast"
import { setLoading } from "../../slices/userSlice";
import { apiConnector } from "../apiConnector"

import {testEndpoints} from "../apis"

const {
    CREATE_TEST_API,
    DISABEL_TEST_API,
    ENABLE_TEST_API,
    GET_TEST_API
} = testEndpoints

export function disableTest(
    testId,
    testName,
    instructorId,
    token
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", DISABEL_TEST_API, {
                testId,
                testName,
                instructorId,
                token
            })

            console.log("DISABLE TEST API RESPONSE............", response)

            if (!response.data.success) {
                dispatch(setLoading(false))
                toast.dismiss(toastId)
                throw new Error(response.data.message)
            }

            toast.success("Test Disabled")
            dispatch(setLoading(false))
            toast.dismiss(toastId)

        }catch(error){
            toast.dismiss(toastId)
            dispatch(setLoading(false))
            console.log("DISABLE TEST API ERROR............", error)
            toast.error("Disabeling Test Failed")
        }
    }
}

export function enableTest(
  testId,
  testName,
  instructorId,
  token
) {
  return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try{
          const response = await apiConnector("POST", ENABLE_TEST_API, {
              testId,
              testName,
              instructorId,
              token
          })

          console.log("ENABLE TEST API RESPONSE............", response)

          if (!response.data.success) {
              dispatch(setLoading(false))
              toast.dismiss(toastId)
              throw new Error(response.data.message)
          }

          toast.success("Test Enabled")
          dispatch(setLoading(false))
          toast.dismiss(toastId)

      }catch(error){
          toast.dismiss(toastId)
          dispatch(setLoading(false))
          console.log("ENABLE TEST API ERROR............", error)
          toast.error("Enabling Test Failed")
      }
  }
}

export const getTest = async(testId, token) => {
    const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  
  let result = null
  try {
    // console.log(testId)
    const response = await apiConnector("POST", GET_TEST_API, {testId, token},
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("GET_TEST_API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.curTest
  } catch (error) {
    console.log("GET_TEST_API ERROR............", error)
    result = error
    // toast.error(error.response.data.message);
  }

  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result

}

export function createTest(
  testName,
  instructorId,
  questions,
  token
) {
  return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try{
          const response = await apiConnector("POST", CREATE_TEST_API, {
              testName,
              instructorId,
              questions,
              token
          })

          console.log("CREATE TEST API RESPONSE............", response)

          if (!response.data.success) {
              dispatch(setLoading(false))
              toast.dismiss(toastId)
              throw new Error(response.data.message)
          }

          toast.success("Test Created")
          dispatch(setLoading(false))
          toast.dismiss(toastId)

      }catch(error){
          toast.dismiss(toastId)
          dispatch(setLoading(false))
          console.log("CREATE TEST API ERROR............", error)
          toast.error("Creating Test Failed")
      }
  }
}