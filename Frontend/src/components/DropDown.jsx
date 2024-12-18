import React from 'react';

const DropDown = ({
  competitions,
  selectedCompetition,
  setSelectedCompetition,
}) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedCompetition(e.target.value);
  };
  return (
    <>
      <select
        className="form-select"
        aria-label="Default select example"
        value={selectedCompetition}
        onChange={handleChange}>
        <option
          value=""
          disabled
          selected>
          Select competition
        </option>
        {competitions.map((competition) => (
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
