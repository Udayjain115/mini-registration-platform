import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Event from '../components/event';
import userService from '../services/userService';

const LandingPage = ({
  events,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  users,
  setUsers,
}) => {
  console.log(isLoggedIn);

  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const handleEditChange = (e) => {
    const { value } = e.target;
    setEditName(value);
  };

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, name: editName };
    userService.update(currentUser.email, updatedUser);

    setCurrentUser(updatedUser);
    setIsEdit(false);
  };

  const handleLogIn = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  return (
    <div className="landing-page">
      <div className="header">
        <button
          type="button"
          className="login-button"
          onClick={handleLogIn}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
      {isLoggedIn ? null : (
        <p className="alert alert-primary info">
          You are not logged in. Click Login to register for the event
        </p>
      )}
      <div className="landing-page-logged-in">
        <div
          className={`${
            isLoggedIn ? 'events-container-logged-in' : 'events-container'
          }`}>
          {events.map((event) => (
            <Event
              currentUser={currentUser}
              users={users}
              setUsers={setUsers}
              key={event.id}
              event={event}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
        {isLoggedIn ? (
          <div className="user-container">
            {console.log(currentUser)}
            <p>{`Name : ${currentUser.name}`}</p>
            <p>{`Email : ${currentUser.email}`}</p>
            {isEdit ? (
              <form>
                <input
                  onChange={handleEditChange}
                  type="text"
                  placeholder="Enter your name"
                  className="edit-input"
                />
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="edit-button update">
                  Update
                </button>
              </form>
            ) : null}
            <button
              type="button"
              className="edit-button"
              onClick={handleEdit}>
              Edit Name
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LandingPage;
