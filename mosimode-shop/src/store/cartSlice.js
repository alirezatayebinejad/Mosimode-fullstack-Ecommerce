import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isCartOpen: false,
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const { userId, anonymousUserUuid, product, count } = action.payload;
            console.log("userId", userId, "anonymousUserUuid", anonymousUserUuid, 'product', product, "count", count);
            axios.post("/api/cartCRUD", { action: "add", userId, anonymousUserUuid, productId: product.id })
            state.cart = [...state.cart, { product, count }];
        },

        removeFromCart: (state, action) => {
            const { userId, anonymousUserUuid, productId } = action.payload;
            axios.post("/api/cartCRUD", { action: "remove", userId, anonymousUserUuid, productId })
            state.cart = state.cart.filter((item) => item.product.id !== productId);
        },

        increaseCount: (state, action) => {
            const { userId, anonymousUserUuid, productId } = action.payload;
            axios.post("/api/cartCRUD", { action: "increase", userId, anonymousUserUuid, productId })
            state.cart = state.cart.map((item) => {
                if (item.product.id === productId) {
                    item.count++;
                }
                return item;
            });
        },

        decreaseCount: (state, action) => {
            const { userId, anonymousUserUuid, productId } = action.payload;
            axios.post("/api/cartCRUD", { action: "decrease", userId, anonymousUserUuid, productId })
            state.cart = state.cart.map((item) => {
                if (item.product.id === productId && item.count > 1) {
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
