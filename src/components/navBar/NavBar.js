import logo from '../../assets/hotel-icon-symbol-sign.jpg';
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";



function NavBar() {
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
          <h3>SMART TRAVEL</h3>
        </span>
            </Link>

            <div className="navbar-div">
                {isAuth ? (
                    <>
                        <span> Welcome {user.username} </span>
                        <button className="nav-button" onClick={handleLogout}>
                            Signout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="nav-button"
                            onClick={() => navigate("/signin")}
                        >
                            Signin
                        </button>
                        <button
                            className="nav-button"
                            onClick={() => navigate("/signup")}
                        >
                            Signup
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;






