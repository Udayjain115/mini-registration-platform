const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

let events = [
  { name: 'Event 1', date: '2022-12-12', description: 'Description1', id: 1 },
];

let users = [
  { name: 'admin', email: 'admin', password: 'Admin', eventsJoined: [] },
  { name: 'User1', email: 'User1', password: 'User1', eventsJoined: [] },
];

const generateId = (idFor) => {
  let arr = [];
  switch (idFor) {
    case 'event':
      arr = events;
      break;
    case 'user':
      arr = users;
      break;
  }
  const maxID = arr.length > 0 ? Math.max(...arr.map((n) => n.id)) : 0;
  return maxID + 1;
};

app.use(express.json());

app.get('/api/events', (request, response) => {
  response.json(events);
});

app.get('/api/events/:id', (request, response) => {
  const id = request.params.id;
  const event = events.find((event) => event.id === id);
  if (event) {
    response.json(event);
  } else {
    response.status(404).send();
  }
});

app.post('/api/events', (request, response) => {
  // TO DO: Depending on what Hajin says, dont allow for two events with the same name
  const body = request.body;
  if (!body.name || !body.date || !body.description) {
    return response.status(400).json({
      error: 'content is missing',
    });
  } else {
    const event = {
      name: body.name,
      date: body.date,
      description: body.description,
      id: generateId('event'),
    };
    events = events.concat(event);
    response.json(events);
  }
});

app.get('/api/users', (request, response) => {
  response.json(users);
});

app.get('/api/users/:email', (request, response) => {
  const email = request.params.email;
  const user = users.find((user) => user.email === email);
  if (user) {
    response.json(user);
  } else {
    response.status(404).send();
  }
});

app.post('/api/users', (request, response) => {
  console.log('POST REQUEST');

  const body = request.body;
  console.log(body);

  if (!body.name || !body.email || !body.password) {
    return response.status(400).json({
      error: 'content is missing',
    });
  } else if (users.find((user) => user.email === body.email)) {
    return response.status(400).json({
      error: 'email already exists',
    });
  } else {
    const user = {
      name: body.name,
      email: body.email,
      password: body.password,
      eventsJoined: body.eventsJoined || [],
    };
    users = users.concat(user);
    response.json(users);
  }
});
app.put('/api/users/:email', (request, response) => {
  const email = request.params.email;
  const body = request.body;
  const user = users.find((user) => user.email === email);
  if (user) {
    const updatedUser = {
      ...user,
      name: body.name,
      eventsJoined: body.eventsJoined,
    };
    users = users.map((user) => (user.email === email ? updatedUser : user));
    response.json(updatedUser);
  } else {
    response.status(404).json({ error: 'user not found' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
