import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  /* useEffect(() => {
    if (user === null) {
      navigate("/SignIn");
    }
  }, [navigate, user]); */

  return children;
}
