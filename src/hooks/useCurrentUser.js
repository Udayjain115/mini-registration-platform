import { useState, useEffect } from 'react';

function useCurrentUser() {
  const [currentUser, setCurrentUserState] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setCurrentUser = (user) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log(user);
    } else {
      localStorage.removeItem('currentUser');
    }
  };

  return [currentUser, setCurrentUser];
}

export default useCurrentUser;
