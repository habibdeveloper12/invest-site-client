import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [isNavbarDisabled, setNavbarDisabled] = useState(false);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to the homepage after signing out
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    <div>
    <nav
      className='navbar fixed-top navbar-expand-lg navbar-white navcolor'>
      <div className="container">
        <div className="d-flex">
          <div>
            <Link className="navbar-brand" to="/">
              <img
                src="../premium.svg"
                alt="Logo"
                style={{ width: "40%", height: "50px" }}
              />
            </Link>
          </div>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div className="collapse justify-content-end navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
          <>
            <li className="nav-item ms-3">
              <Link className="nav-link fw-semibold" to="/dashboard">
                <span className="text-white py-5">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item ms-3" onClick={handleSignOut}>
                    <Link className="nav-link">
                      <span className="ms-1 fw-semibold text-white">Sign Out</span>
                    </Link>
                  </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item ms-3">
                </li>
                <li className="nav-item ms-3">
                  <Link
                    className="nav-link"
                    to="register"
                  >
                    <button className="btn btn-warning">
                     <span className="text-white"> Sign Up</span>
                    </button>
                  </Link>
                </li>
                <li className="nav-item ms-3">
                  <Link
                    className="nav-link"
                    to="login"
                  >
                    <button className="btn btn-outline-warning">
                     <span className="text-white">login</span>
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
