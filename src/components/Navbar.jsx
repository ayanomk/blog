import "./Navbar.css"
import Logo from "./Logo"

function Navbar() {
    return (
        <nav>
            <a href="/" className="logo">
                <Logo />
            </a>
            <div className="nav-items">
                <a href="/adventures">Adventures</a>
                <a href="/aboutme">About me</a>
            </div>
        </nav>
    )
}

export default Navbar