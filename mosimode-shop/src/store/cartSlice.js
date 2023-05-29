import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false,
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            });
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
