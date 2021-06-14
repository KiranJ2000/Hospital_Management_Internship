import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";

import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [helperTextEmail, setHelperEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorP, setErrorP] = useState(false);
  const [helperTextP, setHelperP] = useState("");

  const [showError, setError] = useState(false);

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  function onSubmitClicked(e) {
    e.preventDefault();
    setError(false);
    if (!email) {
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
        "http://localhost:8000/api/sign-in",
        {
          currEmail: email,
          currPassword: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        history.push("/dashboard");
      })
      .catch((err) => {
        setError(true);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <>
        {location.state?.success ? (
          <>
            <Alert severity="success">Account succesfully created!</Alert>
            {window.history.replaceState(null, "")}
          </>
        ) : null}
      </>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={errorEmail}
            helperText={helperTextEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={errorP}
            helperText={helperTextP}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              onSubmitClicked(e);
            }}
          >
            Sign In
          </Button>
          <Grid item xs={12}>
            {showError ? (
              <Alert severity="error">Email or Password incorrect!</Alert>
            ) : null}
          </Grid>
          <Grid container>
            <Grid item xs={12} align="center">
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
