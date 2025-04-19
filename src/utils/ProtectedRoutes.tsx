import { JSX } from "react";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router";
// import { RootState } from "../store/store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isAuthenticated = localStorage.getItem("token") !== null;
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
