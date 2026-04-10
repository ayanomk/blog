import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem("token");
        return token && !isTokenExpired(token);
    });

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