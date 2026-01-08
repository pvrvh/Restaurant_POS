import React from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around items-center z-50">
        <button className="text-[#f5f5f5] bg-[#343434] w-[200px] rounded-[20px]"><FaHome className="inline mr-4" size={30} /> Home </button>
        <button className="text-[#ababab] w-[200px]"><MdOutlineReorder className="inline mr-4" size={30} /> Orders </button>
        <button className="text-[#ababab] w-[200px]"><MdTableBar className="inline mr-4" size={30} /> Table </button>
        <button className="text-[#ababab] w-[200px]"><CiCircleMore className="inline mr-4" size={30} /> More </button>
    </div>
  );
};

export default BottomNav;