import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = null;
  const navigate = useNavigate();

  /*  useEffect(() => {
    if (user === null) {
      navigate("/SignIn", { replace: true });
    }
  }, [navigate, user]); */

  return children;
}
