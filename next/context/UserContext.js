import { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Provider component to wrap your app and provide the user state
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Initialize with null user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to access the UserContext
export function useUser() {
  return useContext(UserContext);
}
