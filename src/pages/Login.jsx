import { useState } from "react";
import "./Login.css";
import { login } from '../services/loginService.js';

function Login() {
    const [viewPassowrd, setPasswordView] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
        const res = await login(loginInfo);
        if (res.status == "fail") console.log(res.message);
        else localStorage.setItem("token", res.token);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    return (
        <div className="loginPage">
            <div className="loginCard">
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
                <button type="button" onClick={handleLogin}>LOGIN</button>
            </div>

        </div>
    )
}

export default Login;