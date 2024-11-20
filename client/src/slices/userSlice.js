import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, value) { 
            state.user = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload
        }
    }
})

export const { setUser, setToken, setLoading } = userSlice.actions;
export default userSlice.reducer;