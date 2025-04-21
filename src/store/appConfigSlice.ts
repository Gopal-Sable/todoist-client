import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, TaskType } from "../utils/types";

interface AppConfig {
    isModalOpen: boolean;
    isTaskModalOpen: boolean;
    taskModalData: TaskType;
    projectModalData: Project;
}

const initialState: AppConfig = {
    isModalOpen: false,
    isTaskModalOpen: false,
    taskModalData: {
        id: -1,
        content: "",
        created_at: "",
        description: "",
        due_date: "",
        is_completed: 0,
        project_id: -1,
    },
    projectModalData: {
        id: -1,
        color: "",
        is_favorite: 0,
        name: "",
        user_id: -1,
    },
};

const appConfig = createSlice({
    name: "appConfig",
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        toggleTaskModal: (state) => {
            state.isTaskModalOpen = !state.isTaskModalOpen;
        },
        setModalTask: (state, action: PayloadAction<TaskType>) => {
            state.taskModalData = action.payload;
        },
        resetModalTask: (state) => {
            state.taskModalData = initialState.taskModalData;
        },
        setModalProject: (state, action: PayloadAction<Project>) => {
            state.projectModalData = action.payload;
        },
        resetModalProject: (state) => {
            state.projectModalData = initialState.projectModalData;
        },
    },
});

export const {
    toggleModal,
    toggleTaskModal,
    setModalTask,
    resetModalTask,
    setModalProject,
    resetModalProject,
} = appConfig.actions;
export default appConfig.reducer;
