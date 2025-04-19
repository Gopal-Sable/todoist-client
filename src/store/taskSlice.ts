import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "../utils/types";

const initialState: TaskType[] = [];
// { [key: number]: TaskType[] } = {};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (_, action: PayloadAction<TaskType[]>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<TaskType>) => {
            state.unshift(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            return state.filter((task) => task.id !== action.payload);
        },

        updateTask: (state, action: PayloadAction<TaskType>) => {
            const index = state.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { setTasks, addTask, deleteTask, updateTask } =
    taskSlice.actions;
export default taskSlice.reducer;
