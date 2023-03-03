import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products.slices";
import proinf from "./slices/product.info";
import cartshopin from "./slices/token.carshopin";
import stado from "./slices/state.slice";

const store=configureStore({
reducer:{
    products,
    proinf,
    cartshopin,
    stado
}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store 