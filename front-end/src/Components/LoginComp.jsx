/*login comp
Justin Li 104138316
Last edited 6/10/2023*/
import React, { useState } from "react";

import axios from "axios";

import "../Css/Forms.css";

//for routing after login https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom

import { useNavigate } from "react-router-dom";

const url = "http://localhost:8000/api/login";

function Login() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  //validation consts
  const validateUsername = (username) => {
    //return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return username.length > 0;
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  //for submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateUsername(username)) {
      setErrMsg("Username is required");
      return;
    } else setErrMsg("");

    if (!validatePassword(password)) {
      setErrMsg("Password must be at least 8 characters long");
      return;
    }

    try {
      //post form data
      const response = await axios.post(
        url,

        JSON.stringify({ username, password }),

        {
          headers: { "Content-Type": "application/json" },

          //needs this
          withCredentials: true,
        }
      );

      //check login success
      if (response.data.status) {
        const token = response.data.token;
        const age = response.data.user.age;
        const gender = response.data.user.gender;
        const nationality = response.data.user.nationality;
        const postcode = response.data.user.postcode;
        const name = response.data.user.name;
        const user_id = response.data.user.user_id;

        const email = response.data.user.email;

        localStorage.setItem("token", token);

        localStorage.setItem("email", email);

        localStorage.setItem("username", username);

        localStorage.setItem("password", password);

        localStorage.setItem("age", age);

        localStorage.setItem("gender", gender);

        localStorage.setItem("nationality", nationality);

        localStorage.setItem("postcode", postcode);

        localStorage.setItem("name", name);

        localStorage.setItem("userId", user_id);

        navigate("/");
      }
    } catch (error) {
      //err

      if (!error.response) {
        setErrMsg("No server response");
      } else if (errMsg.response?.status === 400) {
        setErrMsg("Missing user name or password");
      } else if (errMsg.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  return (
    <>
      {success ? (
        <section>Welcome! You are logged in.</section>
      ) : (
        <div className="layout">
          <div className="container">
            <div className="signInImage">
              <img src="https://octopod.co.in/slink/images/login.svg" alt="" />
            </div>
            <div className="form">
              <h2>Welcome to the Website</h2>

              <p>Login to manage your account</p>
              <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>

                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                    className="form-input"
                  />
                </div>

                <div className="field">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </div>
              </form>

              <p>
                <a href="/Register" className="link">
                  Don't have an account? Click here to register!
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
