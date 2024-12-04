import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const LogIn = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);

    if (email === 'admin' && password === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
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
    <div className="login-container">
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        fields={fields}
        buttons={buttons}
      />
    </div>
  );
};

export default LogIn;
