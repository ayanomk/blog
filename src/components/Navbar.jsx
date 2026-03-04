import { NavLink } from "react-router-dom";

import "./Navbar.css"
import Logo from "./Logo"
import { useState } from "react";

function Navbar() {
    // HAMBURGER
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return (
        <nav>
            <NavLink to="/" className="logo" onClick={() => setHamburgerOpen(false)}>
                <Logo />
            </NavLink>

            <div className={`nav-items ${hamburgerOpen ? "open" : ""}`}>
                <div>
                    <NavLink to="/adventures" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setHamburgerOpen(false)}>Adventures</NavLink>
                    <NavLink to="/aboutme" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setHamburgerOpen(false)}>About me</NavLink>
                </div>
                <NavLink to="/admin/login" className={"login"} style={{display: `${hamburgerOpen ? "block" : "none"}`}} onClick={() => setHamburgerOpen(false)}>Login</NavLink>
            </div>

            {/* hamburger */}
            <button className={`hamburger ${hamburgerOpen ? "open" : ""}`} onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                <span />
            </button>
        </nav>
    )
}

export default Navbar