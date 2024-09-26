import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import Button from "./Button";
import { logout } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    if (!user) {
      console.log("User not logged in");
      return;
    }
    const { data, error } = await logout();
    if (data) {
      setUser(null);
      navigate("/SignIn", { replace: true });
    } else {
      setLoading(false);
      console.error("Failed to log out", error);
      return;
    }
    setLoading(false);
  };
  return (
    <div>
      <Button isLoading={loading} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
