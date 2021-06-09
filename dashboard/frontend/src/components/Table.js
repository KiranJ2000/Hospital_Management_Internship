import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

export default function CustomizedTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Qualification</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rowItems.map((item) => {
            return (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {item.first_name + " " + item.last_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.qualification}
                </StyledTableCell>
                <StyledTableCell align="right">{item.email}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    align="center"
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      props.editButton(item.id);
                    }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    align="center"
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      props.deleteButton(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
