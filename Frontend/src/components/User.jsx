import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import userService from '../services/userService';

const User = ({ user, users, setUsers, currentUser, setCurrentUser }) => {
  console.log(currentUser);
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState('');

  const handleEditChange = (e) => {
    const { value } = e.target;
    setEditName(value);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleUpdate = () => {
    if (!editName.trim()) return;

    const updatedUser = { ...currentUser, name: editName.trim() };
    userService.update(currentUser.email, updatedUser).then((updated) => {
      setUsers(users.map((u) => (u.email === updated.email ? updated : u)));
      setCurrentUser(updated);
      setIsEdit(false);
    });
  };

  return (
    <Card
      className=" profile me-5 my-3 px-4 py-3 shadow-sm"
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>Email: {user.email}</Card.Text>
        <Card.Text>Events Joined: {user.eventsJoined.join(', ')}</Card.Text>

        {isEdit && (
          <Form className="mt-3">
            <Form.Group controlId="formEditName">
              <Form.Label>Update Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your new name"
                value={editName}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Button
              variant="success"
              className="mt-2 me-2"
              onClick={handleUpdate}>
              Update
            </Button>
            <Button
              variant="secondary"
              className="mt-2"
              onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </Form>
        )}

        {!isEdit && (
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleEdit}>
            Edit Name
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default User;
