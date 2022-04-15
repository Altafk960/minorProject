import React from "react";
import { Link } from "react-router-dom";
import classes from "./navBar.module.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
 // console.log(isLoggedIn);

  return (
    <>
      <div className={classes.mainNavigation}>
        <div className={classes.appHeading}>
          <h1>Heading</h1>
        </div>

        <div className={classes.links}>
          <Link className={classes.linkContent} to="/myUploads">
            My uploads
          </Link>
          {!isLoggedIn && (
            <Link className={classes.linkContent} to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
