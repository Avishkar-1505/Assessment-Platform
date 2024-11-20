import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    student: localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : null, //name, email, testId
    submissions: localStorage.getItem("submissions")
    ? JSON.parse(localStorage.getItem("submissions"))
    : []
}

const studentSlice = createSlice({
    name: "student",
    initialState: initialState,
    reducers: {
        setStudent(state, value) {
            state.student = value.payload
        },
        addSubmission(state, action) {
            const sub = action.payload
            const index = state.submissions.findIndex((submission) => submission === sub)

            if (index >= 0) {
                return
            }

            state.submissions.push(sub)
            localStorage.setItem("submissions", JSON.stringify(state.submissions))
        }
    }
})

export const {setStudent, addSubmission} = studentSlice.actions
export default studentSlice.reducer