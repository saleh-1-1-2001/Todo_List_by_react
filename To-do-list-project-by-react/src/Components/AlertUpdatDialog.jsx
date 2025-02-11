import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useContext, useEffect } from "react";
import { openUpdatDialog } from "../Contexts/ToDoListArrayFromComtext";
import { ToDoListArrayFromContext } from "../Contexts/ToDoListArrayFromComtext";
import { openSnackbar } from "../Contexts/ToDoListArrayFromComtext";

export default function AlertUpdatDialog() {
  const { updatDialog, setUpdatDialog } = useContext(openUpdatDialog);
  const { toDoArray, setToDoArray } = useContext(ToDoListArrayFromContext);
  const [TextFieldInput, setTextFieldInput] = useState("");
  const { updatSnackBar, setUpdatSnackBar } = useContext(openSnackbar);
  // To fill TextFieldInput By prevalue of todo
  useEffect(() => {
    setTextFieldInput(updatDialog.preTodoValue);
  }, [updatDialog]);
  const handleAgreeClick = () => {
    const updatedToDoList = toDoArray.map((t) => {
      if (updatDialog.EId == t.id) {
        const TextFieldValue = TextFieldInput;
        return { ...t, toDoContext: TextFieldValue };
      } else {
        return t;
      }
    });
    setToDoArray(updatedToDoList);
    localStorage.setItem("toDoArray", JSON.stringify(updatedToDoList));
    setTextFieldInput("");
    setUpdatSnackBar({
      ...updatSnackBar,
      context: "updated successfully",
      statusSnackBar: true,
    });
    handleClose();
  };

  const handleClose = () => {
    setUpdatDialog({ ...updatDialog, statusE: false });
  };
  return (
    <React.Fragment>
      <Dialog
        open={updatDialog.statusE}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to update this item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm that you want to update the selected item in your
            to-do list. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <TextField
          value={TextFieldInput}
          className="text-field"
          label="Add Todo"
          variant="outlined"
          style={{ width: "90%", margin: "0% auto" }}
          onChange={(e) => setTextFieldInput(e.target.value)}
        />
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            disabled={TextFieldInput == "" ? true : false}
            onClick={handleAgreeClick}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
