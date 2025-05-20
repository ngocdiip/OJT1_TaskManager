import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./loginForm.module.css";
import { LOGIN_API } from "../../config/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      const { access_token } = data;

      if (!access_token) {
        throw new Error("Access token not received");
      }
      localStorage.setItem("accessToken", access_token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className={style.formContainer} onSubmit={handleLogin}>
      <div className={style.formGroup}>
        <label className={style.label} htmlFor="username">
          Username:
        </label>
        <input
          className={style.input}
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label className={style.label} htmlFor="password">
          Password:
        </label>
        <input
          className={style.input}
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: 12, textAlign: "center" }}>
          {error}
        </div>
      )}
      <button className={style.button} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
