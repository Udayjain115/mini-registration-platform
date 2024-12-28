import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import userService from '../services/userService';
import { Link } from 'react-router-dom';
const SignUp = ({ users, setUsers, currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [allowAccountCreation, setAllowAccountCreation] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const adminUserName = import.meta.env.VITE_ADMIN_USERNAME;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

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
      userService
        .create(newUser)
        .then(() => {
          userService.getAll().then((updatedUsers) => {
            setUsers(updatedUsers);
            navigate('/login');
          });
        })
        .catch((error) => {
          console.error(error);
          setMessage('Enter A Valid Email');
        });
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }

    setEmail('');
    setPassword('');
    setFirstName('');
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
    <Container className="vh-100 d-flex flex-column justify-content-center">
      <Row>
        <h1 className="text-center mb-5">Create an Account</h1>
      </Row>
      <Row>
        <Col
          lg={6}
          md={6}
          sm={6}
          className="mx-auto">
          <Form
            className={'signup-form'}
            message={message}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            fields={fields}
            buttons={buttons}
          />
        </Col>
      </Row>
      <Row>
        <div className="d-inline d-flex justify-content-center mt-2">
          <p fs-5>
            Already Signed Up?{' '}
            <Link
              to="/login"
              className="text-decoration-none text-btn">
              <span className="lead fw-bold ">Login Here</span>
            </Link>
          </p>
        </div>
      </Row>
    </Container>
  );
};

export default SignUp;
