import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isActive = (path) => location.pathname === path;

  const handleSettings = () => {
    const confirmLogout = window.confirm("Do you want to logout?");
    if (confirmLogout) {
      dispatch(clearUser());
      navigate("/auth");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around items-center z-50">
        <button 
          onClick={() => navigate("/")}
          className={`${isActive("/") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px] py-2 transition-all hover:bg-[#343434]`}
        >
          <FaHome className="inline mr-4" size={30} /> Home
        </button>
        <button 
          onClick={() => navigate("/orders")}
          className={`${isActive("/orders") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px] py-2 transition-all hover:bg-[#343434]`}
        >
          <MdOutlineReorder className="inline mr-4" size={30} /> Orders
        </button>
        <button 
          onClick={() => navigate("/table")}
          className={`${isActive("/table") ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"} w-[200px] rounded-[20px] py-2 transition-all hover:bg-[#343434]`}
        >
          <MdTableBar className="inline mr-4" size={30} /> Table
        </button>
        <button 
          onClick={handleSettings}
          className="text-[#ababab] w-[200px] rounded-[20px] py-2 transition-all hover:bg-[#343434]"
        >
          <FiSettings className="inline mr-4" size={30} /> Settings
        </button>
    </div>
  );
};

export default BottomNav;