import React from 'react';

const Notification = ({ message, className }) => {
  if (message === null || message === '') {
    return null;
  }
  console.log(message);

  return <p className={`${className}`}>{message}</p>;
};

export default Notification;
