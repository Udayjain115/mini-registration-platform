import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
const SignUp = ({ users, setUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((user) => user.email === email);
    if (user) {
      alert('User already exists');
      return;
    } else {
      setUsers([users.concat({ email, password, firstName })]);
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
    <div className="signup-container">
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        fields={fields}
        buttons={buttons}
      />
    </div>
  );
};

export default SignUp;
