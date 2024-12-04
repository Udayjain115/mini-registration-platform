import React from 'react';

const Notification = ({ message }) => {
  console.log(message);

  return <p className="alert alert-danger notification">{message}</p>;
};

export default Notification;
