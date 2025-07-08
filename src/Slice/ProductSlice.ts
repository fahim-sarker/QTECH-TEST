import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number | string;
  qty: number;
  [key: string]: any;
};

type ProductState = {
  cartitem: CartItem[];
};

const initialState: ProductState = {
  cartitem: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string)
    : [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      let findproduct = state.cartitem.findIndex(
        (item) => item.id == action.payload.id
      );
      if (findproduct !== -1) {
        state.cartitem[findproduct].qty += 1;
        localStorage.setItem("cart", JSON.stringify(state.cartitem));
      } else {
        state.cartitem = [...state.cartitem, action.payload];
        localStorage.setItem("cart", JSON.stringify(state.cartitem));
      }
    },
    productincrement: (state, action: PayloadAction<number>) => {
      if (state.cartitem[action.payload]) {
        state.cartitem[action.payload].qty += 1;
        localStorage.setItem("cart", JSON.stringify(state.cartitem));
      }
    },
    productdeccrement: (state, action: PayloadAction<number>) => {
      if (state.cartitem[action.payload]?.qty > 1) {
        state.cartitem[action.payload].qty -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cartitem));
      }
    },
    productremove: (state, action: PayloadAction<number>) => {
      state.cartitem.splice(action.payload, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartitem));
    },
  },
});

export const { addToCart, productincrement, productdeccrement, productremove } =
  ProductSlice.actions;

export default ProductSlice.reducer;
