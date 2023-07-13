import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const setUserStateInLocalStorage = (userState) => {
    localStorage.setItem('userState', JSON.stringify(userState));
  };
  
  // Utility function to get user state from local storage
  export const getUserStateFromLocalStorage = () => {
    const storedUserState = localStorage.getItem('userState');
    return storedUserState ? JSON.parse(storedUserState) : null;
  };

export const UserProvider = ({ children }) => {
  const initialUserState = getUserStateFromLocalStorage() || { username: '', signedIn: false };
  const [userState, setUserState] = useState(initialUserState);

  const updateUserState = (updatedUserState) => {
    setUserState(updatedUserState);
    setUserStateInLocalStorage(updatedUserState);
  };

  return (
    <UserContext.Provider value={{ userState, updateUserState }}>
      {children}
    </UserContext.Provider>
  );
};