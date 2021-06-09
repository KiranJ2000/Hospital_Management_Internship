import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

import { Typography, Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import CustomizedTable from "./Table";

import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

function Doctor(props) {
  const [items, setItems] = useState([]);
  const [openCreateModal, setOpen] = useState(false);
  const [openEditModal, setEditOpen] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [editKey, setKey] = useState(0);
  const [deleteKey, setDeleteKey] = useState(0);
  const [deleteUsername, setDeleteUsername] = useState(0);
  const [showError, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  function isUserLoggedIn() {
    axios
      .get("http://localhost:8000/api/check-login", { withCredentials: true })
      .then((res) => getDoctorDetails())
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  }

  function getDoctorDetails() {
    axios
      .get("http://localhost:8000/api/doctor", { withCredentials: true })
      .then(({ data }) => {
        setItems(data);
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

  function addButtonClicked() {
    setOpen(true);
  }

  function editButtonClicked(key) {
    items.map((item) => {
      if (item.id === key) {
        setKey(item.id);
        setUserData(item);
      }
    });

    setEditOpen(true);
  }

  function closeCreateButtonClicked() {
    setOpen(false);
  }

  function closeEditButtonClicked() {
    setEditOpen(false);
  }

  function createButtonClicked(data) {
    data.occupation = "doctor";
    axios
      .post("http://localhost:8000/api/add-user", data, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        setItems([...items, data]);
        setOpen(false);
      })
      .catch((err) => setError(true));
  }

  function editConfirmButtonClicked(editData) {
    editData.occupation = "doctor";
    axios
      .patch("http://localhost:8000/api/update-user", editData, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log();
        items.map((item) => {
          if (item.id === editData.id) {
            console.log("podo");
            item.first_name = data.first_name;
            item.last_name = data.last_name;
            item.email = data.email;
            item.phone = data.phone;
            item.gender = data.gender;
            item.qualification = data.qualification;
          }
        });

        setEditOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function deleteItem(deleteKey) {
    axios.post(
      "http://localhost:8000/api/delete-user",
      {
        id: deleteKey,
      },
      { withCredentials: true }
    );
    const filteredItem = items.filter((item) => item.id !== deleteKey);
    setItems(filteredItem);
    setDeleteModal(false);
  }

  function deleteButtonClicked(deleteKey) {
    setDeleteKey(deleteKey);
    items.map((item) => {
      if (item.id === deleteKey) {
        setDeleteUsername(item.first_name + " " + item.last_name);
      }
    });
    setDeleteModal(true);
  }

  function closeDeleteButtonClicked() {
    setDeleteModal(false);
  }

  return (
    <>
      <Grid container>
        <Navbar navbar="doctor" logOutCallback={logOutButtonClicked} />
      </Grid>
      <Grid container align="center">
        <Grid item xs={6} align="right">
          <Typography variant="h2">Doctor</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          align="right"
          style={{ position: "relative", bottom: "55px", right: "20px" }}
        >
          <Button
            variant="outlined"
            size="large"
            color="primary"
            onClick={addButtonClicked}
          >
            <AddIcon style={{ marginRight: "10px" }} />
            Add
          </Button>
        </Grid>
      </Grid>
      <Grid container align="center">
        <Grid item xs={12} style={{ position: "relative", bottom: "43px" }}>
          <CustomizedTable
            editButton={editButtonClicked}
            deleteButton={deleteButtonClicked}
            rowItems={items}
          />
        </Grid>
      </Grid>
      <CreateModal
        modalOpen={openCreateModal}
        closeModal={closeCreateButtonClicked}
        createButton={createButtonClicked}
        error={showError}
        name="doctor"
      />
      <EditModal
        modalOpen={openEditModal}
        closeModal={closeEditButtonClicked}
        editButton={editConfirmButtonClicked}
        userEditData={userData}
        eKey={editKey}
      />
      <DeleteModal
        modalOpen={openDeleteModal}
        closeModal={closeDeleteButtonClicked}
        deleteButton={deleteItem}
        deleteName={deleteUsername}
        eKey={deleteKey}
      />
    </>
  );
}

export default Doctor;
