import { useNavigate } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const navigate = useNavigate();
    return (
        <footer>
            <p>&copy; 2026 my little adventures. All rights reserved.</p>
            <div>
                <button onClick={() => navigate("/admin/login")}>Login</button>
            </div>
        </footer>
    )
}

export default Footer