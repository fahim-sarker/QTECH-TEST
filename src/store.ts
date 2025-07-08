import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Slice/ProductSlice";

const store = configureStore({
  reducer: {
    Product: ProductReducer,
  },
});

export default store;
