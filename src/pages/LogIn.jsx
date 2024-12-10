import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Notification from '../components/Notification';
import userService from '../services/userService';
import admin from './admin';
const LogIn = ({
  isLoggedIn,
  setIsLoggedIn,
  users,
  setCurrentUser,
  currentUser,
  setUsers,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const adminUserName = import.meta.env.VITE_ADMIN_USERNAME;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === adminUserName && password === adminPassword) {
      setCurrentUser({
        email: adminUserName,
        password: adminPassword,
        name: 'admin',
        eventsJoined: [],
      });
      setIsLoggedIn(true);
    } else {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) {
        setMessage('Invalid email or password');
        setIsLoggedIn(false);
        return;
      }
      const userCopy = { ...user };
      setCurrentUser(userCopy);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    if (
      currentUser &&
      currentUser.email === adminUserName &&
      currentUser.password === adminPassword
    ) {
      navigate('/admin');
      console.log('going to admin');
    } else if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const fields = [
    { label: 'Email', type: 'email', name: 'email', value: email },
    { label: 'Password', type: 'password', name: 'password', value: password },
  ];

  const buttons = [
    { text: 'Log In', handle: handleSubmit },
    { text: 'Create an Account', handle: () => navigate('/signup') },
  ];

  return (
    <>
      <div className="signup-container">
        <Form
          className={'signup-form'}
          message={message}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          fields={fields}
          buttons={buttons}
        />
      </div>
    </>
  );
};

export default LogIn;
