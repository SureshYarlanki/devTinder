import React from "react";

const Dropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-orange-400 border border-gray-200 rounded-lg shadow-lg px-4">
      <ul className="py-2 text-white">
        <li className="px-4 py-2 hover:bg-orange-500 cursor-pointer">
          Option 1
        </li>
        <li className="px-4 py-2 hover:bg-orange-500 cursor-pointer">
          Option 2
        </li>
        <li className="px-4 py-2 hover:bg-orange-500 cursor-pointer">
          Option 3
        </li>
        <li className="px-4 py-2 hover:bg-orange-500 cursor-pointer">
          Option 4
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
