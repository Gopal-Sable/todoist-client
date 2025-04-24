import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";
import appConfig from "./appConfigSlice";
import commentSlice from "./commentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
        tasks: taskReducer,
        appConfig: appConfig,
        comment: commentSlice,
    },
});

// Infer types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
