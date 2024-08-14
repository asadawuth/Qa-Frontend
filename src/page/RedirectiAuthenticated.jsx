import { useAuth } from "../hook/use-auth";
import { Navigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }) {
  const { authUser } = useAuth();
  if (authUser) {
    //null false  //{} obj empty true
    return <Navigate to="/" />;
  }
  return children;
}
