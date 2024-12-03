import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
const events = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'];
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App events={events} />
  </StrictMode>
);
