import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { openSnackbar } from "../Contexts/ToDoListArrayFromComtext";
export default function CustomSnackbar() {
  const { updatSnackBar, setUpdatSnackBar } = useContext(openSnackbar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setUpdatSnackBar(false);
  };

  return (
    <div>
      <Snackbar
        open={updatSnackBar.statusSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {updatSnackBar.context}
        </Alert>
      </Snackbar>
    </div>
  );
}
