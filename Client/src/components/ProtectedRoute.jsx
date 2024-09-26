import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import PropTypes from "prop-types";
import ButtonLoadingSpinner from "./ButtonLoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/signin");
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <ButtonLoadingSpinner loadingText={"Authenticating..."} />;
  }

  return user ? children : null;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
