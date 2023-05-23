import React from "react";

const RatingInput = ({ value, onChange, onBlur, options = [] }) => {
  return (
    <div>
      <p>Rate this marker</p>
      <input
        type="number"
        min="0"
        max={options.length - 1}
        value={value}
        onChange={onChange}
      />
      <select value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RatingInput;
