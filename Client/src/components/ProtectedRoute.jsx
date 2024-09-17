import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../api/auth.api";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await fetchCurrentUser();
      if (data) {
        return null;
      }
      navigate("/SignIn");
    };
    getUser();
  }, []);

  return children;
}
