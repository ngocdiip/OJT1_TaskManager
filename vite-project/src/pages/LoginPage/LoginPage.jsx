import style from "./LoginPage.module.css";
import React, { useState } from "react";
import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerForm";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={style.loginPage}>
      <h1 className={style.title}>
        {showRegister ? "Register" : "Login"} Page
      </h1>
      <div className={style.switchText}>
        {showRegister ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setShowRegister(false)}
              className={style.switchButton}
            >
              Login
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className={style.switchButton}
            >
              Register
            </button>
          </>
        )}
      </div>
      {showRegister ? (
        <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default LoginPage;
