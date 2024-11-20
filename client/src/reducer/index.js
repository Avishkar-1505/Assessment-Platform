import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice"
import studentReducer from "../slices/studentSlice"
import testReducer from "../slices/testSlice"

const rootReducer = combineReducers({
    user: userReducer,
    test: testReducer,
    student: studentReducer
})

export default rootReducer;