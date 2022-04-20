import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import  { loginActions } from "./store/store";
import { useDispatch } from "react-redux";
import NavBar from './NavBar';
// import bgSvg from "../graphic3.svg"

const Login = () => {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  let navigate = useNavigate();

  const emailInputHandler = (e) => {
    setEmailInput(e.target.value);
  };

  const emailFocusHandler = (e) => {
    setEmailFocus(true);
  };

  const emailBlurHandler = (e) => {
    setEmailFocus(false);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordFocusHandler = (e) => {
    setPasswordFocus(true);
  };
  const passwordBlurHandler = (e) => {
    setPasswordFocus(false);
  };

  let activeEmailClassName = "emailText";
  let activePasswordClassName = "";
  // bro ye design kharaab kar rha h 
  if (emailInput.length > 0 || emailFocus) {
    activeEmailClassName = "active"; 
  }

  if (password.length > 0 || passwordFocus) {
    activePasswordClassName = "active";
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
   // console.log(response);

    if (response.message === "LOGIN_SUCCESSFUL") {
      dispatch(loginActions.onLogin());
      localStorage.setItem("token", response.user.token)
      localStorage.setItem("user", response.user.userId);
      // console.log(response.user.token);
      // console.log(localStorage.getItem("user"));
      navigate("/home");
    }
  };

  return (
    <div className={classes.bgImg}>
      <NavBar></NavBar>
      <div className={classes.bgSvg}>
      <div className={classes.loginForm}>
        <form onSubmit={submitHandler}>
          <div className={classes.loginHead}>Login to account</div>
          <div className={classes.loginSubHead}>Access to the more secure distributed cloud storage system.</div>
          <div className={` ${classes.formControl}`}>
            <label className={classes.emailText}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your E-mail Address"
              onChange={emailInputHandler}
              onFocus={emailFocusHandler}
              onBlur={emailBlurHandler}
              className={classes.inputEmail}
            ></input>
          </div>

          <div className={classes.formControl}>
            <label className={classes.emailText}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={passwordInputHandler}
              onFocus={passwordFocusHandler}
              onBlur={passwordBlurHandler}
            ></input>
          </div>

          <button className={classes.btnSubmit} type="submit">Login</button>
          <p className={classes.signUp}>
            Doesn't have an account
            <Link className={classes.signBtn} to="/signup">SignUp here</Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;
