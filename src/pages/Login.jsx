import { useState } from "react";
import "./Login.css";
import { login } from '../services/loginService.js';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [viewPassowrd, setPasswordView] = useState(false);
    const [error, setError] = useState("");

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await login(loginInfo);
        if (res.status == "fail") setError("Invalid username or password");
        else {
            localStorage.setItem("token", res.token);
            navigate("/adventures")
        }
    }

    const handleChange = (e) => {
        setError("");

        const { name, value } = e.target;

        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    return (
        <div className="loginPage">
            {error ? <p className="errorMessage">{error}</p> : null}
            <form className="loginCard" onSubmit={handleLogin}>
                <img src="../public/icon/user-circle-stroke-rounded.svg" alt="" />
                <div className="loginDetail">
                    <label htmlFor="username">USERNAME</label>
                    <input type="text" id="username" name="username" value={loginInfo.username} onChange={handleChange} />
                </div>
                <div className="loginDetail">
                    <label htmlFor="password">PASSWORD</label>
                    <div className="passwordView">
                        <input type={viewPassowrd ? "text" : "password"} id="password" name="password" onChange={handleChange}/>
                        <img src={viewPassowrd ? "../public/icon/view-stroke-rounded.svg" : "../public/icon/view-off-stroke-rounded.svg"} onClick={() => setPasswordView(!viewPassowrd)} alt="" />
                    </div>
                </div>
                <button type="submit" onClick={handleLogin}>LOGIN</button>
            </form>

        </div>
    )
}

export default Login;