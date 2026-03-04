import { useState } from "react";
import "./Login.css";

function Login() {
    const [viewPassowrd, setPasswordView] = useState(false);

    return (
        <div className="loginPage">
            <div className="loginCard">
                <img src="../public/icon/user-circle-stroke-rounded.svg" alt="" />
                <div className="loginDetail">
                    <label htmlFor="">USERNAME</label>
                    <input type="text" />
                </div>
                <div className="loginDetail">
                    <label htmlFor="">PASSWORD</label>
                    <div className="passwordView">
                        <input type={viewPassowrd ? "text" : "password"} />
                        <img src={viewPassowrd ? "../public/icon/view-stroke-rounded.svg" : "../public/icon/view-off-stroke-rounded.svg"} onClick={() => setPasswordView(!viewPassowrd)} alt="" />
                    </div>
                </div>
                <button>LOGIN</button>
            </div>

        </div>
    )
}

export default Login;