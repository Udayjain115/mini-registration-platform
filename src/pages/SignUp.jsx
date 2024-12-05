import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Notification from '../components/Notification';
import userService from '../services/userService';
const SignUp = ({ users, setUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [allowAccountCreation, setAllowAccountCreation] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(users);

    const user = users.find((user) => user.email === email);
    console.log(user);

    if (!email || !password || !firstName) {
      setMessage('Please fill in all fields');
      setAllowAccountCreation(false);
      return;
    }
    if (user) {
      console.log(user);
      setAllowAccountCreation(false);
      setMessage('User already exists');
      return;
    } else {
      setAllowAccountCreation(true);
      setMessage('');
      const newUser = {
        name: firstName,
        email: email,
        password: password,
      };
      userService.create(newUser);
      setUsers(userService.getAll());
      console.log(userService.getAll().toString());
    }
    console.log(users);

    setEmail('');
    setPassword('');
    setFirstName('');

    navigate('/login');
  };
  const fields = [
    { label: 'Email', type: 'email', name: 'email', value: email },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: password,
    },
    { label: 'Name', type: 'text', name: 'Name', value: firstName },
  ];

  const buttons = [{ text: 'Create an Account', handle: handleSubmit }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Name') setFirstName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <>
      {!allowAccountCreation && <Notification message={message} />}
      <div className="signup-container">
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

export default SignUp;
