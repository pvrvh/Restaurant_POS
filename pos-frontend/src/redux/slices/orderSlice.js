import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  nextOrderId: 1,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: state.nextOrderId,
        customerName: action.payload.customerName,
        tableNumber: action.payload.tableNumber,
        items: action.payload.items,
        subtotal: action.payload.subtotal,
        tax: action.payload.tax,
        total: action.payload.total,
        status: "pending",
        timestamp: new Date().toISOString(),
      };
      state.orders.unshift(newOrder);
      state.nextOrderId += 1;
    },
    updateOrderStatus: (state, action) => {
      const order = state.orders.find(o => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    },
  },
});

export const { addOrder, updateOrderStatus, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
