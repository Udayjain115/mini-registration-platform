const express = require('express');
const app = express();
const port = 3000;



const events = [
  { name: 'Event 1', date: '2022-12-12', description: 'Description1', id: 1 },
];

const users = [
  { name: 'admin', email: 'admin', password: 'Admin', eventsJoined: [] },
  { name: 'User1', email: 'User1', password: 'User1', eventsJoined: [] },
];

const generateId = (idFor) => {
    const arr
    switch (idFor) {
        case 'event':
            arr = events;
        case 'user':
            arr = users;
    }
    console.log(arr);
    
}


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
    }
    events = events.concat(event);
    response.json(events);
}});

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
