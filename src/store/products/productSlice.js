import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        activeProduct: null,
        isLoading: false,

    },
    reducers: {
        onLoadProducts: (state, action) => {
            state.products = action.payload;
        },
        onSetActiveProduct: (state, action) => {
            state.activeProduct = action.payload;
        },
    },
});

export const { onLoadProducts, onSetActiveProduct } = productSlice.actions;