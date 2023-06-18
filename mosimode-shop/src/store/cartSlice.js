import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isCartOpen: false,
    cart: [],
};

// Async thunk to fetch the cart data
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, anonymousUserUuid }) => {
    const response = await axios.get("/api/cartCRUD", { params: { userId, anonymousUserUuid } });
    return response.data.cart;
});

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart: (state, action) => {
            const { userId, anonymousUserUuid, product, count } = action.payload;
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
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            const products = action.payload.map(item => { return { product: item.Product, count: item.quantity } })
            state.cart = products;
        });
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
