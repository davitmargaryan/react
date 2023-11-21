import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, MenuItem, Select } from "@mui/material";

const AddStudentDialog = ({ onClose, open, onSave }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("male");

  const onNameChange = (e) => setName(e.target.value);
  const onSurnameChange = (e) => setSurname(e.target.value);
  const onGenderChange = (e) => setGender(e.target.value);

  const onSaveClick = () => {
    onSave(name, surname, gender);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <div style={{ margin: 16 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={onNameChange}
          />
        </div>
        <div style={{ margin: 16 }}>
          <TextField
            fullWidth
            label="Surname"
            value={surname}
            onChange={onSurnameChange}
          />
        </div>
        <div style={{ margin: 16 }}>
          <Select
            fullWidth
            value={gender}
            label="Gender"
            onChange={onGenderChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSaveClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentDialog;
