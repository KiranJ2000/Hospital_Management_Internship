import React, { useState } from "react";

import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Alert from "@material-ui/lab/Alert";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CreateModal(props) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [emailAd, setEmail] = useState("");
  const [phoneNum, setPhone] = useState("");
  const [genderUser, setGender] = useState("");
  const [qualificationUser, setQualification] = useState("");

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  function dataButtonClicked(e) {
    e.preventDefault();
    let data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAd,
      phone: phoneNum,
      gender: genderUser,
      qualification: qualificationUser,
    };

    props.createButton(data);
  }

  return (
    <Grid container>
      <Modal
        open={props.modalOpen ? true : false}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary">
                Create {props.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              {props.error ? (
                <Alert severity="error">Fill all the inputs!</Alert>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Qualification"
                onChange={(e) => setQualification(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={dataButtonClicked}
            >
              Create
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              style={{ marginLeft: "10px" }}
              onClick={props.closeModal}
            >
              Close
            </Button>
          </Grid>
          <CreateModal />
        </div>
      </Modal>
    </Grid>
  );
}

export default CreateModal;
