import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const getUserFromToken = (token) => {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
}

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

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) return null;
        return getUserFromToken(token);
    })

    const login = (token) => {
        localStorage.setItem("token", token);
        if (!token) setUser(null);
        else setUser(getUserFromToken(token));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}