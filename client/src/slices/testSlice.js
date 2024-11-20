import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    test: localStorage.getItem("test") ? JSON.parse(localStorage.getItem("test")) : null,
    questions: localStorage.getItem("questions") ? JSON.parse(localStorage.getItem("questions")) : null,
    loading: false
}

const testSlice = createSlice({
    name: "test",
    initialState: initialState,
    reducers: {
        setTest(state, value) {
            state.test = value.payload
        },
        setQuestions(state, value) {
            state.questions = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        }
    }
})

export const { setTest, setQuestions, setLoading} = testSlice.actions;
export default testSlice.reducer;