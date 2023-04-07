import logo from '../../assets/hotel-icon-symbol-sign.jpg';
import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import SubmitButton from "../button/SubmitButton";


function NavBar({ title }) {
    const { isAuth, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav>
            <Link to="/">
        <span className="logo-container">
          <img src={logo} alt="logo" />
          <h3>{title}</h3>
        </span>
            </Link>

            <div className="navbar-div">
                {isAuth ? (
                    <>
                        <span> Welcome {user.username} </span>

                        <SubmitButton
                            label="Signout"
                            className="nav-button"
                            onClick={handleLogout}
                        ></SubmitButton>
                    </>
                ) : (
                    <>
                        <SubmitButton
                            label="Signin"
                            className="nav-button"
                            onClick={() => navigate("/signin")}
                        ></SubmitButton>

                        <SubmitButton
                            label="Signup"
                            className="nav-button"
                            onClick={() => navigate("/signup")}
                        ></SubmitButton>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;





