import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  logout_button: {
    marginLeft: "690px",
  },

  button: {
    maxWidth: "130px",
    maxHeight: "70px",
    minWidth: "130px",
    minHeight: "60px",
  },

  background_dashboard: {
    backgroundColor: (props) =>
      props.navbar === "dashboard" ? "rgb(60, 62, 178)" : "null",
  },

  background_doctor: {
    backgroundColor: (props) =>
      props.navbar === "doctor" ? "rgb(60, 62, 178)" : "null",
  },

  background_nurse: {
    backgroundColor: (props) =>
      props.navbar === "nurse" ? "rgb(60, 62, 178)" : "null",
  },
}));

const Navbar = (props) => {
  const classes = useStyles(props);
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          size="large"
          color="inherit"
          className={`${classes.button} ${classes.background_dashboard}`}
          onClick={() => history.push("/dashboard")}
        >
          Dashboard
        </Button>
        <Button
          size="large"
          color="inherit"
          className={`${classes.button} ${classes.background_doctor}`}
          onClick={() => history.push("/doctor")}
        >
          Doctors
        </Button>
        <Button
          size="large"
          color="inherit"
          className={`${classes.button} ${classes.background_nurse}`}
          onClick={() => history.push("/nurse")}
        >
          Nurses
        </Button>
        <Button
          color="inherit"
          className={`${classes.button} ${classes.logout_button}`}
          onClick={props.logOutCallback}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
