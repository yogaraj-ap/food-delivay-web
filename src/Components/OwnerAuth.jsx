import React, { useState } from "react";
import "./OwnerAuth.css";
import { toast } from "react-toastify";
import { loginOwner, signupOwner } from "../Service/Api";

function OwnerAuth({ page, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submit = async () => {
    try {
      let res;

     
      if (page === "owner-signup") {
        if (!email || !password || !name) {
          toast.error("All fields required");
          return;
        }

        res = await signupOwner({ email, password, name });

        if (res.data.success) {
          toast.success("Owner registered successfully");
          setPage("owner-login");
        } else {
          toast.error(res.data.message);
        }
      }

      
      if (page === "owner-login") {
        if (!email || !password) {
          toast.error("Email & password required");
          return;
        }

        res = await loginOwner({ email, password });

        if (res.data.success && res.data.role === "OWNER") {
       
          localStorage.setItem("ownerEmail", email);
          localStorage.setItem("ownerRole", "OWNER");

          toast.success("Owner login successful");
          setPage("owner-dashboard");
        } else {
          toast.error("This is not an owner account");
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="owner-auth-container">
      <div className="owner-auth-box">
        <h2>
          {page === "owner-login"
            ? "Restaurant Owner Login"
            : "Restaurant Owner Signup"}
        </h2>

        {page === "owner-signup" && (
          <input
            placeholder="Restaurant / Owner Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={submit}>
          {page === "owner-login" ? "Login" : "Signup"}
        </button>

        <p className="switch-link">
          {page === "owner-login" ? (
            <span onClick={() => setPage("owner-signup")}>
              New Owner? Signup
            </span>
          ) : (
            <span onClick={() => setPage("owner-login")}>
              Already registered? Login
            </span>
          )}
        </p>

        <p className="back-link" onClick={() => setPage("welcome")}>
          ← Back to Home
        </p>
      </div>
    </div>
  );
}

export default OwnerAuth;
