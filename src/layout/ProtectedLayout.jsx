import { LoaderPage } from "@/Pages/Loader";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectRoutes;
