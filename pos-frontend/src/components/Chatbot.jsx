import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp, IoClose, IoSend } from "react-icons/io5";
import { RiRobot2Fill } from "react-icons/ri";
import { menuItems } from "../../constants/menuData";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm your food assistant. I can help you find the perfect dish! Try asking me for recommendations or about our menu.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Appetizer recommendations
    if (input.includes("appetizer") || input.includes("starter") || input.includes("start")) {
      const appetizers = menuItems.filter(item => item.category === "Appetizers");
      const randomAppetizer = appetizers[Math.floor(Math.random() * appetizers.length)];
      return `I recommend trying our ${randomAppetizer.name}! ${randomAppetizer.description} It's only ₹${randomAppetizer.price}. 🍽️`;
    }
    
    // Main course recommendations
    if (input.includes("main") || input.includes("dinner") || input.includes("lunch") || input.includes("hungry")) {
      const mains = menuItems.filter(item => item.category === "Main Course");
      const randomMain = mains[Math.floor(Math.random() * mains.length)];
      return `For your main course, I suggest ${randomMain.name}. ${randomMain.description} Only ₹${randomMain.price}! 🍛`;
    }
    
    // Dessert recommendations
    if (input.includes("dessert") || input.includes("sweet") || input.includes("cake")) {
      const desserts = menuItems.filter(item => item.category === "Desserts");
      const randomDessert = desserts[Math.floor(Math.random() * desserts.length)];
      return `Sweet tooth? Try our ${randomDessert.name}! ${randomDessert.description} Just ₹${randomDessert.price}. 🍰`;
    }
    
    // Beverage recommendations
    if (input.includes("drink") || input.includes("beverage") || input.includes("thirsty") || input.includes("coffee") || input.includes("tea")) {
      const beverages = menuItems.filter(item => item.category === "Beverages");
      const randomBeverage = beverages[Math.floor(Math.random() * beverages.length)];
      return `How about ${randomBeverage.name}? ${randomBeverage.description} ₹${randomBeverage.price}. ☕`;
    }
    
    // Popular items
    if (input.includes("popular") || input.includes("recommend") || input.includes("suggestion") || input.includes("best")) {
      const popular = [
        menuItems.find(item => item.name === "Chicken Biryani"),
        menuItems.find(item => item.name === "Butter Chicken"),
        menuItems.find(item => item.name === "Margherita Pizza")
      ];
      const randomPopular = popular[Math.floor(Math.random() * popular.length)];
      return `One of our most popular dishes is ${randomPopular.name}! ${randomPopular.description} ₹${randomPopular.price}. Customers love it! ⭐`;
    }
    
    // Vegetarian options
    if (input.includes("veg") || input.includes("vegetarian")) {
      return `We have great vegetarian options like Paneer Tikka Masala (₹240), Pasta Alfredo (₹220), and Caesar Salad (₹150)! 🥗`;
    }
    
    // Price-based queries
    if (input.includes("cheap") || input.includes("budget") || input.includes("affordable")) {
      const affordable = menuItems.filter(item => item.price < 150).slice(0, 3);
      const suggestions = affordable.map(item => `${item.name} (₹${item.price})`).join(", ");
      return `Budget-friendly options: ${suggestions}. All delicious! 💰`;
    }
    
    // Combo or full meal
    if (input.includes("combo") || input.includes("meal") || input.includes("full")) {
      return `I recommend a complete meal: Caesar Salad (₹150) + Butter Chicken (₹300) + Gulab Jamun (₹80) + Masala Chai (₹50). Total: ₹580! 🍽️`;
    }
    
    // Help
    if (input.includes("help") || input.includes("what can you")) {
      return `I can help you with:\n- Food recommendations by category\n- Popular dishes\n- Budget-friendly options\n- Vegetarian choices\n- Meal combos\n\nJust ask me anything! 😊`;
    }
    
    // Default response
    const randomResponses = [
      "I'd be happy to help! Could you tell me what type of food you're in the mood for? 🤔",
      "Great question! Are you looking for appetizers, main course, desserts, or beverages? 🍽️",
      "Let me help you find something delicious! What category interests you? 😊",
      `We have ${menuItems.length} amazing dishes! What are you craving today? 🌟`
    ];
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate bot response with slight delay
    setTimeout(() => {
      const botResponse = {
        type: "bot",
        text: generateResponse(inputMessage),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-[#343434] flex flex-col z-50 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#02ca3a] to-[#01a030] p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <RiRobot2Fill size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">Food Assistant</h3>
                <p className="text-white/80 text-xs">Always here to help! 🍽️</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.type === "user"
                      ? "bg-[#02ca3a] text-white rounded-br-none"
                      : "bg-[#262626] text-[#f5f5f5] rounded-bl-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setInputMessage("Recommend something popular");
                setTimeout(() => handleSendMessage(), 100);
              }}
              className="px-3 py-1 bg-[#262626] text-[#ababab] rounded-full text-xs whitespace-nowrap hover:bg-[#343434]"
            >
              Popular dishes
            </button>
            <button
              onClick={() => {
                setInputMessage("Vegetarian options");
                setTimeout(() => handleSendMessage(), 100);
              }}
              className="px-3 py-1 bg-[#262626] text-[#ababab] rounded-full text-xs whitespace-nowrap hover:bg-[#343434]"
            >
              Vegetarian
            </button>
            <button
              onClick={() => {
                setInputMessage("Budget friendly");
                setTimeout(() => handleSendMessage(), 100);
              }}
              className="px-3 py-1 bg-[#262626] text-[#ababab] rounded-full text-xs whitespace-nowrap hover:bg-[#343434]"
            >
              Budget options
            </button>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#343434]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-[#262626] text-[#f5f5f5] px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#02ca3a]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#02ca3a] text-white p-3 rounded-xl hover:bg-[#01a030] transition-all"
              >
                <IoSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#02ca3a] to-[#01a030] text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110 z-50 animate-bounce-slow"
      >
        {isOpen ? (
          <IoClose size={28} />
        ) : (
          <IoChatbubbleEllipsesSharp size={28} />
        )}
      </button>

      {/* Pulsing indicator */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#02ca3a] opacity-20 animate-ping z-40"></div>
      )}
    </>
  );
};

export default Chatbot;
