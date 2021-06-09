import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },

  color: {
    backgroundColor: (props) =>
      props.doctor ? "rgb(4, 179, 170)" : "rgb(179, 143, 46)",
  },
});

export default function SimpleCard(props) {
  const classes = useStyles(props);

  return (
    <Card className={`${classes.root} ${classes.color}`}>
      <CardContent>
        <Typography color="textPrimary" variant="h3" gutterBottom>
          {props.name}
        </Typography>

        <Typography variant="h4" color="textSecondary">
          {props.number}
        </Typography>
      </CardContent>
    </Card>
  );
}
