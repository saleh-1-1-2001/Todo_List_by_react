import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { openDeletDialog } from "../Contexts/ToDoListArrayFromComtext";
import { ToDoListArrayFromContext } from "../Contexts/ToDoListArrayFromComtext";

import { openSnackbar } from "../Contexts/ToDoListArrayFromComtext";

export default function AlertDialog() {
  const { deletDialog, setDeletDialog } = useContext(openDeletDialog);
  const { toDoArray, setToDoArray } = useContext(ToDoListArrayFromContext);
  const { updatSnackBar, setUpdatSnackBar } = useContext(openSnackbar);
  const handleClose = () => {
    setDeletDialog({ ...deletDialog, statusE: false });
  };
  const handleDeletItem = () => {
    const updatedToDoList = toDoArray.filter((t) => {
      if (deletDialog.EId == t.id) {
        return false;
      } else {
        return true;
      }
    });
    setToDoArray(updatedToDoList);
    localStorage.setItem("toDoArray", JSON.stringify(updatedToDoList));
    setUpdatSnackBar({
      ...updatSnackBar,
      context: "removed successfully",
      statusSnackBar: true,
    });
    handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={deletDialog.statusE}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You sure"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this item? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeletItem} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
