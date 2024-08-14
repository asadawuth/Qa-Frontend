// import { useAuth } from "../hook/use-auth";
// import { Navigate } from "react-router-dom";

// export default function Authenticated({ children }) {
//   const { authUser } = useAuth();
//   if (!authUser) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// }

import { useAuth } from "../hook/use-auth";
import { Navigate } from "react-router-dom";

export default function Authenticated({ children }) {
  const { authUser } = useAuth();
  if (!authUser) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }
  return children;
}
