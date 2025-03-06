import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number; // Available stock
  userQuantity: number; // How many times the user added this product
}

interface CartState {
  items: Product[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find((item) => item.id === action.payload.id);

      if (existingProduct) {
        // ✅ Prevent user from adding more than available stock
        if (existingProduct.userQuantity < existingProduct.quantity) {
          existingProduct.userQuantity += 1;
        } else {
          alert("Cannot add more than available stock!");
        }
      } else {
        // ✅ Add product to cart with `userQuantity: 1`
        state.items.push({ ...action.payload, userQuantity: 1 });
      }

      // ✅ Update total price
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.userQuantity, 0);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.userQuantity, 0);
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; userQuantity: number }>) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        if (action.payload.userQuantity <= product.quantity) {
          product.userQuantity = action.payload.userQuantity;
        } else {
          alert("Cannot exceed available stock!");
        }
      }

      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.userQuantity, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
