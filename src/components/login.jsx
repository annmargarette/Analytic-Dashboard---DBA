import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setErrors("");

    // Check if the username and password are correct
    if (username === "user" && password === "1234") {
      onLogin(); // Call the onLogin function passed from the parent (index.jsx)
    } else {
      setErrors("Invalid username or password"); // Show an error message if credentials are wrong
    }
  };

  return (
    <>
      <img src="/deped.png" alt="DepEd Logo" className="logo-top-left" />

      <div className="login-page">
        <div className="login-left">
          <form className="login-box" onSubmit={handleSubmit}>
            <h1>Welcome</h1>

            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errors && <div className="error-text">{errors}</div>}

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>
        </div>
        <div className="login-right">
          <img src="/login.png" alt="Background" className="login-image" />
        </div>
      </div>
    </>
  );
};

export default Login;
