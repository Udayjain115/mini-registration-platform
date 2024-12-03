import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
const events = [
  { name: 'Event 1', id: 1 },
  { name: 'Event 2', id: 2 },
  { name: 'Event 3', id: 3 },
  { name: 'Event 4', id: 4 },
  { name: 'Event 5', id: 5 },
  { name: 'Event 6', id: 6 },
  { name: 'Event 7', id: 7 },
  { name: 'Event 8', id: 8 },
  { name: 'Event 9', id: 9 },
  { name: 'Event 10', id: 10 },
];

const users = [];
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App
      events={events}
      users={users}
    />
  </StrictMode>
);
