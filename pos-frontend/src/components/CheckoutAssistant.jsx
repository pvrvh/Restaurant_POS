import React from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { menuItems } from "../constants/menuData";

const CheckoutAssistant = ({ cart, onAddToCart }) => {
  const getSmartSuggestions = () => {
    const cartCategories = cart.map(item => item.category);
    const suggestions = [];

    // Check if cart has dessert
    const hasDessert = cartCategories.includes("Desserts");
    if (!hasDessert) {
      const desserts = menuItems.filter(item => item.category === "Desserts");
      const randomDessert = desserts[Math.floor(Math.random() * desserts.length)];
      suggestions.push({
        ...randomDessert,
        reason: "Complete your meal with something sweet! 🍰"
      });
    }

    // Check if cart has beverage
    const hasBeverage = cartCategories.includes("Beverages");
    if (!hasBeverage) {
      const beverages = menuItems.filter(item => item.category === "Beverages");
      const randomBeverage = beverages[Math.floor(Math.random() * beverages.length)];
      suggestions.push({
        ...randomBeverage,
        reason: "Don't forget a refreshing drink! ☕"
      });
    }

    // Check if cart has appetizer
    const hasAppetizer = cartCategories.includes("Appetizers");
    if (!hasAppetizer && cart.length > 0) {
      const appetizers = menuItems.filter(item => item.category === "Appetizers");
      const randomAppetizer = appetizers[Math.floor(Math.random() * appetizers.length)];
      suggestions.push({
        ...randomAppetizer,
        reason: "Start with a delicious appetizer! 🥗"
      });
    }

    // Popular combo suggestions
    if (cart.length === 0) {
      suggestions.push({
        ...menuItems.find(item => item.name === "Chicken Biryani"),
        reason: "Our most popular dish! Customers love it ⭐"
      });
      suggestions.push({
        ...menuItems.find(item => item.name === "Butter Chicken"),
        reason: "Chef's special recommendation! 👨‍🍳"
      });
    }

    // If they have main course, suggest sides
    const hasMainCourse = cartCategories.includes("Main Course");
    if (hasMainCourse && !hasBeverage) {
      const lassi = menuItems.find(item => item.name === "Mango Lassi");
      if (lassi) {
        suggestions.push({
          ...lassi,
          reason: "Perfect pairing with your meal! 🥤"
        });
      }
    }

    return suggestions.slice(0, 3); // Return max 3 suggestions
  };

  const suggestions = getSmartSuggestions();

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-[#02ca3a]/10 to-[#01a030]/10 border border-[#02ca3a]/30 rounded-xl p-4 mb-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-[#02ca3a] p-2 rounded-full">
          <RiRobot2Fill size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-[#f5f5f5] font-bold text-sm">AI Recommendation</h3>
          <p className="text-[#ababab] text-xs">Enhance your customer's experience</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-2">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="bg-[#262626] rounded-lg p-3 flex items-center justify-between hover:bg-[#343434] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#f5f5f5] font-semibold text-sm">{item.name}</h4>
                <p className="text-[#ababab] text-xs">{item.reason}</p>
                <p className="text-[#02ca3a] font-bold text-sm mt-1">₹{item.price}</p>
              </div>
            </div>
            <button
              onClick={() => onAddToCart(item)}
              className="bg-[#02ca3a] text-white p-2 rounded-lg hover:bg-[#01a030] transition-all flex items-center gap-1 text-sm"
            >
              <FiPlus size={16} />
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Footer tip */}
      <div className="mt-3 pt-3 border-t border-[#343434]">
        <p className="text-[#ababab] text-xs italic">
          💡 Tip: These suggestions can increase customer satisfaction and bill value!
        </p>
      </div>
    </div>
  );
};

export default CheckoutAssistant;
