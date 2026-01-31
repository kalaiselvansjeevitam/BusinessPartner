import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_URL } from "../core/constants/coreUrl";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("session_token");
  console.log("session token");
  if (!token) {
    console.log("not session token");
    return <Navigate to={ROUTE_URL.login} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
