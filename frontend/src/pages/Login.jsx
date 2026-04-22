import { useContext, useState } from "react";
import "./Login.css";
import { validateLogin } from '../services/loginService.js';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { retry } from '../utils/retryFetch.js';

function Login() {
    const {login} = useContext(AuthContext);

    const navigate = useNavigate();
    const [viewPassowrd, setPasswordView] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const res = await retry(() => validateLogin(loginInfo), 5, 2000);
        if (res.status == "fail") {
            setError("Invalid username or password")
            setIsSubmitted(false);
        } else {
            login(res.token);
            navigate("/adventures")
        }
    }

    const handleChange = (e) => {
        setError("");

        const { name, value } = e.target;

        setLoginInfo({
            ...loginInfo,
            [name]: value.trim()
        })
    }

    return (
        <div className="loginPage">
            {error ? <p className="errorMessage">{error}</p> : null}
            <form className="loginCard" onSubmit={handleLogin}>
                <img src="/icon/user-circle-stroke-rounded.svg" alt="" />
                <div className="loginDetail">
                    <label htmlFor="username">USERNAME</label>
                    <input type="text" id="username" name="username" value={loginInfo.username} onChange={handleChange} autoComplete="off" />
                </div>
                <div className="loginDetail">
                    <label htmlFor="password">PASSWORD</label>
                    <div className="passwordView">
                        <input type={viewPassowrd ? "text" : "password"} id="password" name="password" onChange={handleChange} autoComplete="off"/>
                        <img src={viewPassowrd ? "/icon/view-stroke-rounded.svg" : "/icon/view-off-stroke-rounded.svg"} onClick={() => setPasswordView(!viewPassowrd)} alt="" />
                    </div>
                </div>
                <button type="submit" onClick={handleLogin} disabled={isSubmitted}>LOGIN</button>
            </form>
            <div className="demo-info">
                <h1>Demo account</h1>
                <p>Username: demo_admin</p>
                <p>Password: password123!</p>
                <p>Note: Saving, publishing, deleting a blog post is disabled.</p>
            </div>

        </div>
    )
}

export default Login;