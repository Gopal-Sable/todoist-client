import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../utils/types";

const initialState: Project[] = [];

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects: (_, action: PayloadAction<Project[]>) => {
            return action.payload;
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.unshift(action.payload);
        },
        deleteProject: (state, action: PayloadAction<number>) => {
            return state.filter((project) => project.id !== action.payload);
        },

        updateProject: (state, action: PayloadAction<Project>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { setProjects, addProject, deleteProject, updateProject } =
    projectSlice.actions;
export default projectSlice.reducer;
