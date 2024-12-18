import React from 'react';
import Notification from './Notification';
import DropDown from './DropDown';
const Form = ({
  handleSubmit,
  handleChange,
  fields,
  buttons,
  message,
  className,
  dropdown,
  competitions,
  selectedCompetition,
  setSelectedCompetition,
}) => {
  return (
    <div>
      <form
        className={className}
        onSubmit={handleSubmit}>
        {dropdown ? (
          <>
            <label>Select A Competition</label>
            <DropDown
              competitions={competitions}
              selectedCompetition={selectedCompetition}
              setSelectedCompetition={setSelectedCompetition}
            />
          </>
        ) : (
          ''
        )}
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={handleChange}
              required
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
        <Notification
          message={message}
          className="alert alert-danger notification"
        />
      </form>
    </div>
  );
};

export default Form;
