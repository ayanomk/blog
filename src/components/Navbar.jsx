import { NavLink } from "react-router-dom";

import "./Navbar.css"
import Logo from "./Logo"

function Navbar() {
    return (
        <nav>
            <NavLink to="/" className="logo">
                <Logo />
            </NavLink>
            <div className="nav-items">
                <NavLink to="/adventures" className={({ isActive }) => isActive ? "active" : ""}>Adventures</NavLink>
                <NavLink to="/aboutme" className={({ isActive }) => isActive ? "active" : ""}>About me</NavLink>
            </div>
        </nav>
    )
}

export default Navbar