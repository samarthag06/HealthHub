import { configureStore } from "@reduxjs/toolkit";
import alertReducer from './features/alertSlice';  // Corrected import path and default export
import { userSlice } from "./features/userSlice";

const store = configureStore({
    reducer: {
        alerts: alertReducer,
        user: userSlice.reducer
    }
});

export default store;