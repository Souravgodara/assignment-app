import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchCurrentUser } from "../api/auth.api";

// Create a context with an empty initial value
export const UserContext = createContext({});

// Function to handle login and fetch the current user

// Context provider component
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await fetchCurrentUser();
      if (!data) {
        return null;
      }
      const user = {
        _id: data._id,
        username: data.username,
        email: data.email,
      };
      setUser(user);
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
