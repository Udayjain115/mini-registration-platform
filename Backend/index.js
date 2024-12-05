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

app.use(express.json());

app.get('/api/events', (request, response) => {
  response.json(events);
});

app.get('/api/users', (request, response) => {
  response.json(users);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
