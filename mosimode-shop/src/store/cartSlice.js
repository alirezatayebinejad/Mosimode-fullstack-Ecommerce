import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isCartOpen: false,
    cart: [],
    totalPrice: 0,
};

const priceCalculator = (cart) => {
    let lastPrice = 0;
    cart.forEach((item) => {
        lastPrice += item.count * item.product.price;
    });
    let cartPrice = Math.round(lastPrice * 100) / 100;

    return cartPrice;
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
            state.totalPrice = priceCalculator(state.cart);
        },

        removeFromCart: (state, action) => {
            const { userId, anonymousUserUuid, productId } = action.payload;
            axios.post("/api/cartCRUD", { action: "remove", userId, anonymousUserUuid, productId })
            state.cart = state.cart.filter((item) => item.product.id !== productId);
            state.totalPrice = priceCalculator(state.cart);
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
            state.totalPrice = priceCalculator(state.cart);
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
            state.totalPrice = priceCalculator(state.cart);
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        clearCart: (state, action) => {
            const { userId, anonymousUserUuid } = action.payload;
            axios.delete("/api/cartCRUD", { params: { userId, anonymousUserUuid } })
            state.cart = [];
            state.totalPrice = priceCalculator(state.cart);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            const products = action.payload.map(item => { return { product: item.Product, count: item.quantity } })
            state.cart = products;
            state.totalPrice = priceCalculator(state.cart);
        });
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
