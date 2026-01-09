import React, { useState, useEffect } from "react";
import { FiX, FiUser } from "react-icons/fi";

const CustomerNameModal = ({ isOpen, onClose, onConfirm }) => {
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCustomerName("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setError("Customer name is required!");
      return;
    }
    onConfirm(customerName.trim());
    setCustomerName("");
    setError("");
  };

  const handleClose = () => {
    setCustomerName("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-[#1a1a1a] rounded-xl p-6 w-[450px] shadow-2xl border border-[#343434]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#f5f5f5] text-2xl font-bold flex items-center gap-2">
            <FiUser className="text-[#02ca3a]" />
            Customer Information
          </h2>
          <button
            onClick={handleClose}
            className="text-[#ababab] hover:text-[#f5f5f5] transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="customerName" className="block text-[#ababab] mb-2 text-sm">
              Enter customer name to confirm order
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                setError("");
              }}
              placeholder="Customer Name"
              className="w-full bg-[#262626] text-[#f5f5f5] px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#02ca3a] transition-all"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-[#262626] text-[#f5f5f5] py-3 rounded-lg font-semibold hover:bg-[#343434] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#02ca3a] text-white py-3 rounded-lg font-semibold hover:bg-[#01a030] transition-all"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerNameModal;
