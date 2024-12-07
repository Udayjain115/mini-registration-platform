import React from 'react';

const Notification = ({ message, className }) => {
  console.log(message);

  return <p className={`${className}`}>{message}</p>;
};

export default Notification;
