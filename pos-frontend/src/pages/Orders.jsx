import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, deleteOrder } from "../redux/slices/orderSlice";
import { FiClock, FiCheck, FiX, FiPackage } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [filter, setFilter] = useState("all");

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#f6b100]/20 text-[#f6b100]";
      case "preparing":
        return "bg-[#3b82f6]/20 text-[#3b82f6]";
      case "ready":
        return "bg-[#02ca3a]/20 text-[#02ca3a]";
      case "delivered":
        return "bg-[#6b7280]/20 text-[#ababab]";
      default:
        return "bg-[#6b7280]/20 text-[#ababab]";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock size={18} />;
      case "preparing":
        return <FiPackage size={18} />;
      case "ready":
        return <FiCheck size={18} />;
      case "delivered":
        return <FiCheck size={18} />;
      default:
        return <FiClock size={18} />;
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder(orderId));
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === "pending").length,
      preparing: orders.filter(o => o.status === "preparing").length,
      ready: orders.filter(o => o.status === "ready").length,
    };
  };

  const stats = getOrderStats();

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-128px)] p-6 pb-24">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <h3 className="text-[#ababab] text-sm mb-2">Total Orders</h3>
          <p className="text-[#f5f5f5] text-3xl font-bold">{stats.total}</p>
        </div>
        
        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <h3 className="text-[#ababab] text-sm mb-2">Pending</h3>
          <p className="text-[#f6b100] text-3xl font-bold">{stats.pending}</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <h3 className="text-[#ababab] text-sm mb-2">Preparing</h3>
          <p className="text-[#3b82f6] text-3xl font-bold">{stats.preparing}</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <h3 className="text-[#ababab] text-sm mb-2">Ready</h3>
          <p className="text-[#02ca3a] text-3xl font-bold">{stats.ready}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "all"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "pending"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("preparing")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "preparing"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          Preparing
        </button>
        <button
          onClick={() => setFilter("ready")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "ready"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          Ready
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "delivered"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          Delivered
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center text-[#ababab] py-20">
          <FiPackage size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-xl">No orders found</p>
          <p className="text-sm mt-2">Orders will appear here once placed from the Home page</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1a1a1a] rounded-xl p-6 hover:bg-[#262626] transition-all"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[#f5f5f5] text-xl font-bold">Order #{order.id}</h3>
                  <p className="text-[#ababab] text-sm">{formatDate(order.timestamp)} at {formatTime(order.timestamp)}</p>
                </div>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <MdDelete size={20} />
                </button>
              </div>

              {/* Customer Info */}
              <div className="bg-[#262626] rounded-lg p-3 mb-4">
                <p className="text-[#f5f5f5] font-semibold">{order.customerName}</p>
                <p className="text-[#ababab] text-sm">Table {order.tableNumber}</p>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-[#ababab]">{item.quantity}x {item.name}</span>
                    <span className="text-[#f5f5f5]">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-[#343434] pt-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#ababab]">Total</span>
                  <span className="text-[#02ca3a] text-xl font-bold">₹{order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {order.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(order.id, "preparing")}
                      className="bg-[#3b82f6] text-white py-2 px-3 rounded-lg hover:bg-[#2563eb] transition-all text-sm"
                    >
                      Start Preparing
                    </button>
                    <button
                      onClick={() => handleStatusChange(order.id, "delivered")}
                      className="bg-[#6b7280] text-white py-2 px-3 rounded-lg hover:bg-[#4b5563] transition-all text-sm"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {order.status === "preparing" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "ready")}
                    className="col-span-2 bg-[#02ca3a] text-white py-2 px-3 rounded-lg hover:bg-[#01a030] transition-all text-sm"
                  >
                    Mark as Ready
                  </button>
                )}
                {order.status === "ready" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "delivered")}
                    className="col-span-2 bg-[#02ca3a] text-white py-2 px-3 rounded-lg hover:bg-[#01a030] transition-all text-sm"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Orders;