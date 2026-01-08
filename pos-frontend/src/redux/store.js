import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    orders: orderReducer,
  },
});

export default store;
