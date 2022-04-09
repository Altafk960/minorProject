import React from 'react';
import { Link } from 'react-router-dom';
import classes from "./navBar.module.css";

const NavBar = () => {

    return (
      <>
        <div className={classes.mainNavigation}>
          <div className={classes.appHeading}>
            <h1>Heading</h1>
          </div>

          <div className={classes.links}>
            <Link className={classes.linkContent} to="/MyContent">
              My uploads
            </Link>
            <Link className={classes.linkContent} to="/login">
              Login
            </Link>
          </div>
        </div>
      </>
    );

}

export default NavBar;