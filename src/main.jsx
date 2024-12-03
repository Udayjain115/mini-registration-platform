import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
const events = [
  { name: 'Event 1', id: 1 },
  { name: 'Event 2', id: 2 },
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
