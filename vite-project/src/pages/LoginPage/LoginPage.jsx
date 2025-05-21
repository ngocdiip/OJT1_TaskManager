import style from "./LoginPage.module.css";
import React, { useState } from "react";
import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerForm";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={style.pageContainer}>
      <div className={style.leftSection}>
        {/* Background image is set via CSS */}
      </div>
      <div className={style.rightSection}>
        <div
          className={`${style.formContainer} ${
            showRegister ? style.slideLeft : style.slideRight
          }`}
        >
          <h2 className={style.formTitle}>
            {showRegister ? "CREATE ACCOUNT" : "ACCOUNT LOGIN"}
          </h2>

          <div className={style.formWrapper}>
            {showRegister ? (
              <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
            ) : (
              <LoginForm />
            )}
          </div>

          <div className={style.formSwitcher}>
            {showRegister ? (
              <div className={style.switchOption}>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className={style.switchButton}
                >
                  SIGN IN
                </button>
              </div>
            ) : (
              <div className={style.switchOption}>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className={style.switchButton}
                >
                  SIGN UP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
