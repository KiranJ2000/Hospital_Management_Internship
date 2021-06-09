import React, { useState } from "react";

import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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

function EditModal(props) {
  console.log(props);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  function editClicked(e) {
    e.preventDefault();
    let data = {
      id: props.eKey,
      first_name: document.getElementById("first").value,
      last_name: document.getElementById("last").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
      qualification: document.getElementById("qualification").value,
    };

    props.editButton(data);
  }

  return (
    <Grid container>
      <Modal
        open={props.modalOpen ? true : false}
        //onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary">
                Edit
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                defaultValue={props.userEditData.first_name}
                id="first"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                defaultValue={props.userEditData.last_name}
                id="last"
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
                defaultValue={props.userEditData.email}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                id="phone"
                defaultValue={props.userEditData.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Gender"
                id="gender"
                defaultValue={props.userEditData.gender}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Qualification"
                id="qualification"
                defaultValue={props.userEditData.qualification}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={editClicked}
            >
              Edit
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
        </div>
      </Modal>
    </Grid>
  );
}

export default EditModal;
