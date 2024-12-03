import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <form>
        <div>
          {email}
          {password}
          <label htmlFor="email">Email</label>
          <input
            onChange={handleEmailChange}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
