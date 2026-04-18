import { NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    // HAMBURGER
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return (
        <nav>
            <NavLink to="/" className="logo" onClick={() => setHamburgerOpen(false)}>
                <img src="/icon/my-blog_logo.svg" alt="" />
            </NavLink>

            <div className={`nav-items ${hamburgerOpen ? "open" : ""}`}>
                <div>
                    <NavLink to="/adventures" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setHamburgerOpen(false)}>Adventures</NavLink>
                    {user !== null ? <NavLink to="/admin/create-blog" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setHamburgerOpen(false)}>Write blog</NavLink> : null}
                    <NavLink to="/aboutme" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setHamburgerOpen(false)}>About me</NavLink>
                </div>
                {user !== null ? 
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