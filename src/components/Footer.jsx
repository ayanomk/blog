import { NavLink } from "react-router-dom";
import './Footer.css';

function Footer() {
    return (
        <footer>
            <p>&copy; 2026 my little adventures. All rights reserved.</p>
            <NavLink to="/admin/login" className={"loginButton"}>Login</NavLink>

        </footer>
    )
}

export default Footer