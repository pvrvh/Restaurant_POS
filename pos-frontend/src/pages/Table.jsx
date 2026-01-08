import React, { useState } from "react";
import { tables } from "../constants/menuData";
import { MdTableBar } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BsCheckCircle, BsClock, BsXCircle } from "react-icons/bs";

const Table = () => {
  const [tableData, setTableData] = useState(tables);
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-[#02ca3a]";
      case "occupied":
        return "bg-[#f6b100]";
      case "reserved":
        return "bg-[#3b82f6]";
      default:
        return "bg-[#6b7280]";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return <BsCheckCircle size={24} />;
      case "occupied":
        return <BsClock size={24} />;
      case "reserved":
        return <BsXCircle size={24} />;
      default:
        return <MdTableBar size={24} />;
    }
  };

  const filteredTables = filter === "all" 
    ? tableData 
    : tableData.filter(table => table.status === filter);

  const changeTableStatus = (tableId, newStatus) => {
    setTableData(tableData.map(table => 
      table.id === tableId ? { ...table, status: newStatus } : table
    ));
  };

  const getStatusCount = (status) => {
    return tableData.filter(table => table.status === status).length;
  };

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-128px)] p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#ababab] text-sm">Total Tables</h3>
            <MdTableBar className="text-[#f5f5f5]" size={24} />
          </div>
          <p className="text-[#f5f5f5] text-3xl font-bold">{tableData.length}</p>
        </div>
        
        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#ababab] text-sm">Available</h3>
            <BsCheckCircle className="text-[#02ca3a]" size={24} />
          </div>
          <p className="text-[#02ca3a] text-3xl font-bold">{getStatusCount("available")}</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#ababab] text-sm">Occupied</h3>
            <BsClock className="text-[#f6b100]" size={24} />
          </div>
          <p className="text-[#f6b100] text-3xl font-bold">{getStatusCount("occupied")}</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#ababab] text-sm">Reserved</h3>
            <BsXCircle className="text-[#3b82f6]" size={24} />
          </div>
          <p className="text-[#3b82f6] text-3xl font-bold">{getStatusCount("reserved")}</p>
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
          All Tables
        </button>
        <button
          onClick={() => setFilter("available")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "available"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setFilter("occupied")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "occupied"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          Occupied
        </button>
        <button
          onClick={() => setFilter("reserved")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            filter === "reserved"
              ? "bg-[#02ca3a] text-white"
              : "bg-[#1a1a1a] text-[#ababab] hover:bg-[#262626]"
          }`}
        >
          Reserved
        </button>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className="bg-[#1a1a1a] rounded-xl p-6 hover:bg-[#262626] transition-all"
          >
            {/* Status Badge */}
            <div className={`${getStatusColor(table.status)} w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white`}>
              {getStatusIcon(table.status)}
            </div>

            {/* Table Info */}
            <h3 className="text-[#f5f5f5] text-2xl font-bold mb-2">
              Table {table.number}
            </h3>
            
            <div className="flex items-center gap-2 text-[#ababab] mb-4">
              <FiUsers size={18} />
              <span>{table.capacity} seats</span>
            </div>

            {/* Status */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                table.status === "available" 
                  ? "bg-[#02ca3a]/20 text-[#02ca3a]"
                  : table.status === "occupied"
                  ? "bg-[#f6b100]/20 text-[#f6b100]"
                  : "bg-[#3b82f6]/20 text-[#3b82f6]"
              }`}>
                {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
              </span>
            </div>

            {/* Active Orders */}
            {table.currentOrders.length > 0 && (
              <div className="text-[#ababab] text-sm mb-4">
                Orders: {table.currentOrders.length}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              {table.status !== "available" && (
                <button
                  onClick={() => changeTableStatus(table.id, "available")}
                  className="w-full bg-[#02ca3a] text-white py-2 rounded-lg hover:bg-[#01a030] transition-all text-sm font-semibold"
                >
                  Mark Available
                </button>
              )}
              {table.status !== "occupied" && (
                <button
                  onClick={() => changeTableStatus(table.id, "occupied")}
                  className="w-full bg-[#f6b100] text-white py-2 rounded-lg hover:bg-[#d99900] transition-all text-sm font-semibold"
                >
                  Mark Occupied
                </button>
              )}
              {table.status !== "reserved" && (
                <button
                  onClick={() => changeTableStatus(table.id, "reserved")}
                  className="w-full bg-[#3b82f6] text-white py-2 rounded-lg hover:bg-[#2563eb] transition-all text-sm font-semibold"
                >
                  Reserve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Table;
