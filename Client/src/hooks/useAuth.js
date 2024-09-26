import { useState, useEffect } from "react";
import { fetchCurrentUser } from "../api/auth.api";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchCurrentUser();
        if (!data) {
          setUser(null);
        } else {
          const user = {
            _id: data._id,
            username: data.username,
            email: data.email,
          };
          setUser(user);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, setUser, isLoading, error };
};

export default useAuth;
