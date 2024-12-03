import { useState } from 'react';
import LandingPage from './pages/landingpage';

function App() {
  const [count, setCount] = useState(0);
  const events = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'];

  return (
    <>
      <LandingPage events={events} />
    </>
  );
}

export default App;
