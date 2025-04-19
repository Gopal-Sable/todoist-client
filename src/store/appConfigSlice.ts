import { createSlice } from "@reduxjs/toolkit";

interface AppConfig {
    isModalOpen: boolean;
}

const initialState: AppConfig = {
    isModalOpen: false,
};

const appConfig = createSlice({
    name: "appConfig",
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isModalOpen =  !state.isModalOpen;
        },
    },
});

export const { toggleModal } = appConfig.actions;
export default appConfig.reducer;
