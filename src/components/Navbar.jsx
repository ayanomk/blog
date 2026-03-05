import { NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css"
import Logo from "./Logo"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const {isLoggedIn, logout} = useContext(AuthContext);
    const navigate = useNavigate();
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
                    {isLoggedIn ? <NavLink to="/admin/create-blog" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setHamburgerOpen(false)}>Write blog</NavLink> : null}
                    <NavLink to="/aboutme" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setHamburgerOpen(false)}>About me</NavLink>
                </div>
                {isLoggedIn ? 
                    <button className={"login"} style={{display: `${hamburgerOpen ? "block" : "none"}`}} onClick={() => {
                        setHamburgerOpen(false);
                        logout();
                    }}>Logout</button> 
                    : <button className={"login"} style={{display: `${hamburgerOpen ? "block" : "none"}`}} onClick={() => {
                        setHamburgerOpen(false);
                        navigate("/admin/login");
                    }}>Login</button>}
            </div>

            {/* hamburger */}
            <button className={`hamburger ${hamburgerOpen ? "open" : ""}`} onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                <span />
            </button>
        </nav>
    )
}

export default Navbar