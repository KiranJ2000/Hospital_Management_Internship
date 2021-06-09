import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
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
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Grid container>
      <Modal
        open={props.modalOpen}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid container align="center">
            <Grid item xs={12}>
              <Typography variant="h5">
                Are you sure you want to delete <b>{props.deleteName}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid container align="center" style={{ marginTop: "10px" }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={() => props.deleteButton(props.eKey)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={props.closeModal}
                style={{
                  marginLeft: "40px",
                  backgroundColor: "rgb(224, 217, 7)",
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </Grid>
  );
}
