import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import userReducer from "./apiSlices/userSlice";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(api.middleware),
});

export default store;