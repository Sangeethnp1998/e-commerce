import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectAuth } from "../../store/auth";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector(selectAuth);

  if (!auth.isRestored) return null;
  if (!auth.user) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
