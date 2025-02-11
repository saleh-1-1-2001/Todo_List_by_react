import Container from "@mui/material/Container";
import ToDoListApp from "./Components/ToDoListApp";
import { useState } from "react";
import "./App.css";
import { ToDoListArrayFromContext } from "./Contexts/ToDoListArrayFromComtext";
import { openDeletDialog } from "./Contexts/ToDoListArrayFromComtext";
import { openUpdatDialog } from "./Contexts/ToDoListArrayFromComtext";
import CustomSnackbar from "./Components/CustomSnackbar";
import { openSnackbar } from "./Contexts/ToDoListArrayFromComtext";
let initialToDo = [];
let initialDeletDialog = { EId: "", statusE: false };
let initialUpdatDialog = { EId: "", preTodoValue: "", statusE: false };
let initialStatusSnackBar = { context: "", statusSnackBar: false };
function App() {
  const [toDoArray, setToDoArray] = useState(initialToDo);
  const [deletDialog, setDeletDialog] = useState(initialDeletDialog);
  const [updatDialog, setUpdatDialog] = useState(initialUpdatDialog);
  const [updatSnackBar, setUpdatSnackBar] = useState(initialStatusSnackBar);
  return (
    <>
      <Container maxWidth="lg">
        <ToDoListArrayFromContext.Provider value={{ toDoArray, setToDoArray }}>
          <openDeletDialog.Provider value={{ deletDialog, setDeletDialog }}>
            <openUpdatDialog.Provider value={{ updatDialog, setUpdatDialog }}>
              <openSnackbar.Provider
                value={{ updatSnackBar, setUpdatSnackBar }}
              >
                <CustomSnackbar />
                <ToDoListApp />
              </openSnackbar.Provider>
            </openUpdatDialog.Provider>
          </openDeletDialog.Provider>
        </ToDoListArrayFromContext.Provider>
      </Container>
    </>
  );
}

export default App;
