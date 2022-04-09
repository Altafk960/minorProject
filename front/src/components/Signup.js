import React, { useState } from "react";
import classes from './Login.module.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  let navigate = useNavigate();

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
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

  const confirmPasswordInputHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const confirmPasswordFocusHandler = (e) => {
    setConfirmPasswordFocus(true);
  };

  const confirmPasswordBlurHandler = (e) => {
    setConfirmPasswordFocus(false);
  };

  let activeEmailClassName = "";
  let activePasswordClassName = "";
  let activeConfirmPasswordClassName = "";
  if (email.length > 0 || emailFocus) {
    activeEmailClassName = "active";
  }

  if (password.length > 0 || passwordFocus) {
    activePasswordClassName = "active";
  }

  if (confirmPassword.length > 0 || confirmPasswordFocus) {
    activeConfirmPasswordClassName = "active";
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword:confirmPassword
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(res);

    const response = await res.json();
    console.log(response.message);
    if (response.message === "SIGNUP_SUCCESSFUL") {
      navigate('/login');
    }
  
  };

  return (
    <div className={classes.loginForm}>
      <form onSubmit={submitHandler}>
        <div className={` ${classes.formControl}`}>
          <label className={classes[activeEmailClassName]}>Email</label>
          <input
            type="email"
            name="email"
            onChange={emailInputHandler}
            onFocus={emailFocusHandler}
            onBlur={emailBlurHandler}
          ></input>
        </div>

        <div className={classes.formControl}>
          <label className={classes[activePasswordClassName]}>Password</label>
          <input
            type="password"
            name="password"
            onChange={passwordInputHandler}
            onFocus={passwordFocusHandler}
            onBlur={passwordBlurHandler}
          ></input>
        </div>

        <div className={classes.formControl}>
          <label className={classes[activeConfirmPasswordClassName]}>
            Password
          </label>
          <input
            type="Password"
            name="confirmPassword"
            onChange={confirmPasswordInputHandler}
            onFocus={confirmPasswordFocusHandler}
            onBlur={confirmPasswordBlurHandler}
          ></input>
        </div>

              <button type="submit">Login</button>
              <p></p>
      </form>
    </div>
  );
};

export default Signup;
