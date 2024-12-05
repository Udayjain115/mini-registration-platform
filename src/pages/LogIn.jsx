import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Notification from '../components/Notification';
import userService from '../services/userService';
const LogIn = ({
  isLoggedIn,
  setIsLoggedIn,
  users,
  setCurrentUser,
  setUsers,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(isLoggedIn);
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });

    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleSubmit = (e) => {
    console.log(users);

    e.preventDefault();
    if (email === 'admin' && password === 'admin') {
      setCurrentUser(users.find((user) => user.email === 'admin'));
      navigate('/admin');
    }

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

    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

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
      {message && <Notification message={message} />}
      <div className="login-container">
        <Form
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
