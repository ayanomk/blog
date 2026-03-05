import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}