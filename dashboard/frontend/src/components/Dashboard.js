import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import axios from "axios";

import { Grid } from "@material-ui/core";

import Navbar from "./Navbar";
import SimpleCard from "./SimpleCard";

function Dashboard() {
  const [doctorLength, setDoctor] = useState("");
  const [nurseLength, setNurse] = useState("");

  const history = useHistory();

  useEffect(() => {
    function isUserLoggedIn() {
      axios
        .get("http://localhost:8000/api/check-login", { withCredentials: true })
        .then((res) => getLength())
        .catch((err) => {
          console.log(err);
          history.push("/");
        });
    }
    isUserLoggedIn();
  }, []);

  function getLength() {
    axios
      .get("http://localhost:8000/api/get-number", { withCredentials: true })
      .then(({ data: { doctorLen, nurseLen } }) => {
        setDoctor(doctorLen);
        setNurse(nurseLen);
      });
  }

  function logOutButtonClicked() {
    axios
      .post(
        "http://localhost:8000/api/sign-out",
        {
          username: "user",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        history.push("/");
      });
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Navbar navbar="dashboard" logOutCallback={logOutButtonClicked} />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "20px", marginLeft: "170px" }}>
        <Grid item xs={4} align="center">
          <Link to="/doctor" style={{ textDecoration: "none" }}>
            <SimpleCard doctor="true" name="Doctor" number={doctorLength} />
          </Link>
        </Grid>
        <Grid
          item
          xs={4}
          align="center"
          style={{ marginLeft: "50px", marginRight: "170px" }}
        >
          <Link to="/nurse" style={{ textDecoration: "none" }}>
            <SimpleCard name="Nurse" number={nurseLength} />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
