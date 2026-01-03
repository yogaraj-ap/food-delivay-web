

import React, { useState } from "react";
import "./Auth.css";
import { loginUser, signupUser, forgotPassword } from "../Service/Api";
import { toast } from "react-toastify";

function Auth({ page, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      let res;

      /* ========= CUSTOMER LOGIN ========= */
      if (page === "login") {
        if (!email.trim() || !password.trim()) {
          toast.error("Email and password required");
          return;
        }

        res = await loginUser({
          email: email.trim(),
          password: password.trim(),
          role: "USER",
        });

        console.log("LOGIN RESPONSE 👉", res.data);

       if (res.data?.success && res.data.role === "USER") {
  const safeEmail = email.trim();
  const safeUserName = safeEmail.split("@")[0];

  localStorage.setItem("userEmail", safeEmail);
  localStorage.setItem("userName", safeUserName);

  toast.success("Login successful 🎉");

  setTimeout(() => {
    setPage("location-accuracy");
  }, 1200);
}
 else {
          toast.error(res.data?.message || "Invalid credentials");
        }
      }

      /* ========= CUSTOMER SIGNUP ========= */
      else if (page === "signup") {
        if (!email.trim() || !password.trim()) {
          toast.error("Email and password required");
          return;
        }

        res = await signupUser({
          email: email.trim(),
          password: password.trim(),
          role: "USER",
        });

        console.log("SIGNUP RESPONSE 👉", res.data);

        if (res.data?.success) {
          toast.success("Signup successful 🎉");
          setPage("login");
        } else {
          toast.error(res.data?.message || "Signup failed");
        }
      }

      /* ========= FORGOT PASSWORD ========= */
      else if (page === "forgot") {
        if (!email.trim()) {
          toast.error("Email required");
          return;
        }

        res = await forgotPassword({ email: email.trim() });

        if (res.data?.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data?.message || "Request failed");
        }
      }
    } catch (error) {
      console.error("AUTH ERROR:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Try again.");
      }
    }
  };

  return (
    <div className="fullscreen-page auth-container">
      <div className="auth-box">
        <h2>
          {page === "login"
            ? "Login"
            : page === "signup"
            ? "Signup"
            : "Forgot Password"}
        </h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {(page === "login" || page === "signup") && (
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button className="auth-btn" onClick={submit}>
          Submit
        </button>

        <div className="auth-links">
          {page === "login" && (
            <span onClick={() => setPage("forgot")}>
              Forgot Password?
            </span>
          )}

          {page !== "login" && (
            <span onClick={() => setPage("login")}>
              Back to Login
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Auth;
