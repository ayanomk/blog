import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;