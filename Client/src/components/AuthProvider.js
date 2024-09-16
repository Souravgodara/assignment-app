import { getUser, login } from "@/api/auth";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3001/auth/current-user");
        const { data } = res.json();
        console.log(data);
        setAuthToken(authToken);
        setCurrentUser(data);
      } catch {
        setAuthToken(null);
        setCurrentUser(null);
      }
    }

    fetchUser();
  }, []);

  async function handleLogin() {
    try {
      const response = await login();

      const { authToken, user } = response[1];

      setAuthToken(authToken);
      setCurrentUser(user);
    } catch {
      setAuthToken(null);
      setCurrentUser(null);
    }
  }

  async function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of a AuthProvider");
  }

  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
