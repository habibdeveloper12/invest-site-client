import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { updateProfile } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Home/Loading/Loading";
import { getRandomFloat } from "../../Componets/Home/utilitis/getRandomId";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user] = useAuthState(auth);

  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";
  const [signInWithGoogle, usergoogle, gloading, error] =
    useSignInWithGoogle(auth);
  useSendEmailVerification(auth);
  const [createUserWithEmailAndPassword, cuser, loading, hookerror] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: false });

  const handleSignup = async () => {
    try {
      // Perform additional checks for password and confirm password
      if (password !== confirmPassword) {
        console.error("Password and confirm password do not match");
        return;
      } else {
        console.log("fg");
        try {
          const createUser = await createUserWithEmailAndPassword(
            email,
            password,
          );
          if (createUser) {
            const response = await axios.post(
              "http://localhost:5003/api/v1/user/register",
              {
                email,
                password,
                fullName,
                userId: getRandomFloat(1, 100, 2),
              }
            );
            console.log(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      }

      // Handle success or redirect to dashboard
    } catch (error) {
      console.error("Signup failed", error);
    }
  };
  if (user) {
    navigate(from);
  }
  if (loading) {
    return <Loading></Loading>;
  }
  return (
<div className=" py-5">
<div className="form-container  form-container-mobile">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group form-group-mobile">
          <label>Full Name:</label>
          <input
            type="text"
            className="form-inputt"
            placeholder="Enter Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-inputt"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Create Password:</label>
          <input
            type="password"
            className="form-inputt"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-inputt"
            placeholder="Retype Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btnprimary btn btn-warning">
          Sign Up
        </button>
        <div className="form-options">
          <p>
            <input type="checkbox" /> I agree to the terms
          </p>
        </div>
      </form>
      <div className="social-login">
      </div>
      <p className="signup-link">
        Already have an account? <a href="/">Log in</a>
      </p>
    </div>
</div>
  );
};

export default Register;
