import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Notification from '../components/Notification';
import userService from '../services/userService';
import { Link } from 'react-router-dom';
import admin from './admin';
import { Container, Row, Col } from 'react-bootstrap';
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

    if (
      email.toLowerCase() === adminUserName &&
      password.toLowerCase() === adminPassword
    ) {
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

  const buttons = [{ text: 'Log In', handle: handleSubmit }];

  return (
    <>
      <Container className="vh-100 d-flex flex-column justify-content-center">
        <Row>
          <h1 className="text-center mb-5">Log In</h1>
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
              Not Signed Up?{' '}
              <Link
                to="/signup"
                className="text-decoration-none text-btn">
                <span className="lead fw-bold ">Register Here</span>
              </Link>
            </p>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default LogIn;
