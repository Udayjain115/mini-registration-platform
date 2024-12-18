import React from 'react';

const Competition = ({ competition }) => {
  return (
    <div className="event-content alert-info alert">
      <p>
        Title: <b>{competition.title}</b>
      </p>
    </div>
  );
};

export default Competition;
