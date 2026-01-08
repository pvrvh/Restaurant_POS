import React from "react";
import {FaSearch} from "react-icons/fa";
import {FaBell} from "react-icons/fa";
import {FaUserCircle} from "react-icons/fa";
import Logo from "../../assets/images/logo.png";


const Header = () => {
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
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-4xl"/>
          <div className="flex flex-col items-start">
            <h1 className="text-base text-[#f5f5f5] font-semibold">Parth Sarthi</h1>
            <span className="text-base text-[#f5f5f5] font-medium">Admin</span>
          </div>    
        </div>
      </div>

    </header>
  );
}

export default Header;