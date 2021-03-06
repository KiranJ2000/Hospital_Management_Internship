import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [errorFN, setErrorFN] = useState(false);
  const [helperTextFN, setHelperFN] = useState("");

  const [lastName, setLastName] = useState("");
  const [errorLN, setErrorLN] = useState(false);
  const [helperTextLN, setHelperLN] = useState("");

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [helperTextEmail, setHelperEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorP, setErrorP] = useState(false);
  const [helperTextP, setHelperP] = useState("");

  const classes = useStyles();
  const history = useHistory();

  function onSubmitClicked(e) {
    e.preventDefault();
    if (!firstName) {
      setErrorFN(true);
      setHelperFN("This field is required!");
      return;
    } else if (!lastName) {
      setErrorLN(true);
      setHelperLN("This field is required!");
      return;
    } else if (!email) {
      setErrorEmail(true);
      setHelperEmail("This field is required!");
      return;
    } else if (!password) {
      setErrorP(true);
      setHelperP("This field is required!");
      return;
    }

    axios
      .post(
        "http://localhost:8000/api/sign-up",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        history.push({
          pathname: "/",
          state: { success: "Account creation success" },
        });
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                error={errorFN}
                helperText={helperTextFN}
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={errorLN}
                helperText={helperTextLN}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errorEmail}
                helperText={helperTextEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errorP}
                helperText={helperTextP}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onSubmitClicked(e)}
          >
            Sign Up
          </Button>
          <Grid container align="center">
            <Grid item align="center">
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
