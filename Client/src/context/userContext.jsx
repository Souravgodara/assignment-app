import { createContext } from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

// Create a context with an empty initial value
export const UserContext = createContext({});

// Context provider component
export function UserContextProvider({ children }) {
  const auth = useAuth();

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
