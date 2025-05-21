import React, { useState } from "react";
import style from "../loginForm/loginForm.module.css";
import { REGISTER_API } from "../../config/api";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fullname: "",
    role: "user",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { confirmPassword, ...submitForm } = form;
      const response = await fetch(REGISTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitForm),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      window.alert("Registration successful!");
      if (onSwitchToLogin) onSwitchToLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className={style.formContainer} onSubmit={handleRegister}>
      <div className={style.formGroup}>
        <label className={style.label} htmlFor="fullname">
          Full Name:
        </label>
        <input
          className={style.input}
          type="text"
          id="fullname"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          required
        />
      </div>
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
      <div className={style.formGroup}>
        <label className={style.label} htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          className={style.input}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
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
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
