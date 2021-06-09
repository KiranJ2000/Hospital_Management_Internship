import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import Navbar from "./Navbar";
import CustomizedTable from "./Table";
import AddIcon from "@material-ui/icons/Add";

import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

import axios from "axios";

function Nurse() {
  const [items, setItems] = useState([]);
  const [openModal, setOpen] = useState(false);
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
      .then((res) => getNurseDetails())
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  }

  function getNurseDetails() {
    axios
      .get("http://localhost:8000/api/nurse", { withCredentials: true })
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
        history.push("/");
      });
  }

  function addButtonClicked() {
    setOpen(true);
  }

  function closeButtonClicked() {
    setOpen(false);
  }

  function createButtonClicked(data) {
    data.occupation = "nurse";
    axios
      .post("http://localhost:8000/api/add-user", data, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setItems([...items, data]);
        setOpen(false);
      })
      .catch((err) => setError(true));
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

  function editConfirmButtonClicked(editData) {
    editData.occupation = "nurse";
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

  function closeEditButtonClicked() {
    setEditOpen(false);
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
        <Navbar navbar="nurse" logOutCallback={logOutButtonClicked} />
      </Grid>
      <Grid container>
        <Grid item xs={6} align="right">
          <Typography variant="h2">Nurse</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          align="right"
          style={{ position: "relative", top: "17px", right: "20px" }}
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
        <Grid item xs={12}>
          <CustomizedTable
            rowItems={items}
            deleteButton={deleteButtonClicked}
            editButton={editButtonClicked}
          />
        </Grid>
      </Grid>
      <CreateModal
        modalOpen={openModal}
        closeModal={closeButtonClicked}
        createButton={createButtonClicked}
        error={showError}
        name="nurse"
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

export default Nurse;
