import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import messagePopupReducer from "./messagePopupSlice";

export const store = configureStore({
    reducer: {
        messagePopup: messagePopupReducer,
        cart: cartReducer,
    },
});