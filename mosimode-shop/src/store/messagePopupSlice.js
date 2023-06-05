import { createSlice } from "@reduxjs/toolkit";

const messagePopupSlice = createSlice({
    name: "messagePopup",
    initialState: {
        showPopup: false,
        message: "",
        mood: true,
    },
    reducers: {
        openPopup: (state, action) => {
            state.showPopup = true;
            state.message = action.payload.message;
            state.mood = action.payload.mood;
        },
        closePopup: (state) => {
            state.showPopup = false;
            state.message = "";
            state.mood = true;
        },
    },
});

export const { openPopup, closePopup } = messagePopupSlice.actions;

export default messagePopupSlice.reducer;