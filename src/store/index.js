import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice.js"
import jobReducer from "./jobSlice.js"
export const store = configureStore({
    reducer: {
        user: userReducer,
        jobs: jobReducer
    }
})