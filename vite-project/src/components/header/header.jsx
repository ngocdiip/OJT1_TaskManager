import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style.logo}>Task Manager</h1>
      <nav className={style.nav}>
        <Link className={style.link} to="/login">
          Login
        </Link>
        <Link className={style.link} to="/tasks">
          Tasks
        </Link>
        <Link className={style.link} to="/assign">
          Assign
        </Link>
        <Link className={style.link} to="/user">
          User
        </Link>
      </nav>
    </header>
  );
};

export default Header;
