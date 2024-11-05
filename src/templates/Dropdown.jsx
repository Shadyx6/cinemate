import React from 'react';

const Dropdown = ({ title, options, cats }) => {
  return (
    <div className="relative flex gap-4  text-left">
      <label className="text-[#D1D1D1] mb-1 block">{title}</label>
      <select
        className="w-full text-sm p-1 h-8 bg-gray-600 text-[#D1D1D1] border border-[#00F5D4] rounded-md focus:outline-none focus:border-[#00F5D4] hover:border-[#00F5D4]"
        onChange={cats}
      >
        <option disabled selected value="">
          -- Select an option --
        </option>
        {options.map((option, index) => (
          <option key={index} value={option} className="text-[#D1D1D1] bg-black hover:bg-[#3D3D3D]">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
