import React from 'react';

const Form = ({ handleSubmit, handleChange, fields, buttons }) => {
  return (
    <div className="signup-container">
      <form
        className="signup-form"
        onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={handleChange}
            />
          </div>
        ))}
        {buttons.map((button) => (
          <button
            key={button.text}
            type="button"
            onClick={button.handle}>
            {button.text}
          </button>
        ))}
      </form>
    </div>
  );
};

export default Form;
