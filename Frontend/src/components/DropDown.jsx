import React from 'react';

const DropDown = ({ options, handleChange, selectedValue, labelText }) => {
  console.log(options);

  return (
    <>
      <select
        className="form-select"
        aria-label="Default select example"
        value={selectedValue}
        onChange={handleChange}>
        <option
          value=""
          disabled>
          {labelText}
        </option>
        {options.map((competition) => (
          <option
            key={competition.id}
            value={competition.id}>
            {competition.title}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
