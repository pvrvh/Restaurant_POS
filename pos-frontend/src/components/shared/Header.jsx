import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import {FaSearch} from "react-icons/fa";
import {FaBell} from "react-icons/fa";
import {FaUserCircle} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../assets/images/logo.png";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/auth");
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img src={Logo} className="h-8 w-8" height="32" width="32" alt="restro logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Restro</h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[20px] px-5 py-2 w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search"
          className="bg-[#1f1f1f] outline-none  text-[#f5f5f5] rounded-[20px] w-full"
        />
      </div>

      {/*LOGGED USER DETAILS */}
      <div className="flex items-center gap-4">
        <div className="bg-[#1f1f1f] p-3 cursor-pointer rounded-[15px]">
          <FaBell className="text-[#f5f5f5] text-2xl"/>
        </div>
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-[#262626] p-2 rounded-lg transition-all"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle className="text-[#f5f5f5] text-4xl"/>
            <div className="flex flex-col items-start">
              <h1 className="text-base text-[#f5f5f5] font-semibold">{userData.name || "User"}</h1>
              <span className="text-base text-[#f5f5f5] font-medium">{userData.role || "Admin"}</span>
            </div>    
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#262626] rounded-lg shadow-lg border border-[#343434] overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-[#f5f5f5] hover:bg-[#343434] transition-all"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}

export default Header;