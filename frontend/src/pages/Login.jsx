import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    alert("Login functionality will be connected to the backend later.");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>

        <p>Sign in to continue to FormFlow</p>

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="remember">
          <input type="checkbox" />
          <span>Remember me</span>
        </div>

        <button type="submit">Login</button>

        <p className="forgot">Forgot Password?</p>
      </form>
    </div>
  );
}

export default Login;