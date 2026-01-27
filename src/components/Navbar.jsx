import { NavLink } from "react-router-dom";

import "./Navbar.css"
import Logo from "./Logo"
import { useState } from "react";

function Navbar() {
    // HAMBURGER
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return (
        <nav>
            <NavLink to="/" className="logo">
                <Logo />
            </NavLink>

            <div className="nav-items">
                <NavLink to="/adventures" className={({ isActive }) => isActive ? "active" : ""}>Adventures</NavLink>
                <NavLink to="/aboutme" className={({ isActive }) => isActive ? "active" : ""}>About me</NavLink>
            </div>

            {/* hamburger */}
            <button className={`hamburger ${hamburgerOpen ? "open" : ""}`} onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                <span />
            </button>
        </nav>
    )
}

export default Navbar