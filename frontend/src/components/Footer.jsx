import { useNavigate } from "react-router-dom";
import './Footer.css';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

function Footer() {
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <footer>
            <p>&copy; 2026 my little adventures. All rights reserved.</p>
            {user !== null ? <button className={"loginButton"} onClick={logout}>Logout</button> 
            : <button className={"loginButton"} onClick={() => navigate("./admin/login")}>Login</button>}
        </footer>
    )
}

export default Footer