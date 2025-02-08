import { configureStore } from "@reduxjs/toolkit";
import postSlice from './postSlice.js'

export const store = configureStore({
    reducer : postSlice
})