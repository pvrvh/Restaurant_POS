import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "../redux/slices/orderSlice";
import Greetings from "../components/shared/Home/Greetings";
import { menuItems, foodCategories } from "../constants/menuData";
import { FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import CheckoutAssistant from "../components/CheckoutAssistant";
import CustomerNameModal from "../components/shared/CustomerNameModal";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = selectedCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, change) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmOrder = (customerName) => {
    const subtotal = getTotalAmount();
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    dispatch(addOrder({
      customerName: customerName,
      tableNumber: selectedTable,
      items: cart,
      subtotal: subtotal,
      tax: tax,
      total: total,
    }));

    alert(`Order placed successfully for ${customerName}!\nTable ${selectedTable}\nTotal: ₹${total.toFixed(2)}`);
    setCart([]);
    setIsModalOpen(false);
  };

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-128px)] flex gap-4 p-4">
      {/* Menu Section */}
      <div className="flex-1 flex flex-col gap-4">
        <Greetings/>
        
        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {foodCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === category.name
                  ? "bg-[#02ca3a] text-white"
                  : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(100vh-350px)]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a1a1a] rounded-xl p-4 hover:bg-[#262626] transition-all cursor-pointer"
              onClick={() => addToCart(item)}
            >
              <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[#f5f5f5] font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-[#ababab] text-sm mb-3 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#02ca3a] font-bold text-xl">₹{item.price}</span>
                <button className="bg-[#02ca3a] text-white p-2 rounded-lg hover:bg-[#01a030]">
                  <FiPlus size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-[400px] bg-[#1a1a1a] rounded-xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#f5f5f5] text-2xl font-bold flex items-center gap-2">
            <FiShoppingCart /> Cart
          </h2>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="bg-[#262626] text-[#f5f5f5] px-4 py-2 rounded-lg outline-none"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>Table {num}</option>
            ))}
          </select>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mb-4">
          {cart.length === 0 ? (
            <div className="text-center text-[#ababab] py-10">
              <FiShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* AI Suggestions */}
              <CheckoutAssistant cart={cart} onAddToCart={addToCart} />
              
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="bg-[#262626] rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="text-[#f5f5f5] font-semibold">{item.name}</h4>
                        <p className="text-[#02ca3a] font-bold">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-[#1a1a1a] text-[#f5f5f5] p-2 rounded-lg hover:bg-[#343434]"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="text-[#f5f5f5] font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-[#1a1a1a] text-[#f5f5f5] p-2 rounded-lg hover:bg-[#343434]"
                      >
                        <FiPlus size={16} />
                      </button>
                      <span className="text-[#ababab] ml-auto">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Total & Checkout */}
        <div className="border-t border-[#343434] pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#ababab] text-lg">Subtotal</span>
            <span className="text-[#f5f5f5] text-xl font-semibold">₹{getTotalAmount()}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#ababab] text-lg">Tax (5%)</span>
            <span className="text-[#f5f5f5] text-xl font-semibold">₹{(getTotalAmount() * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-6 text-2xl">
            <span className="text-[#f5f5f5] font-bold">Total</span>
            <span className="text-[#02ca3a] font-bold">₹{(getTotalAmount() * 1.05).toFixed(2)}</span>
          </div>
          <button
            onClick={placeOrder}
            className="w-full bg-[#02ca3a] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#01a030] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={cart.length === 0}
          >
            Place Order
          </button>
        </div>
      </div>

      <CustomerNameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
      />
    </section>
  );
};

export default Home;
