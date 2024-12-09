import React from 'react';

const User = (props) => {
  const user = props.users;

  return (
    <div
      className="alert alert-info hidden"
      key={user.email}>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Events Joined: {user.eventsJoined.join(', ')}</p>
    </div>
  );
};

export default User;
