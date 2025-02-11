import "./ToDoListApp.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import AlertDialog from "./AlertDialog";
import AlertUpdatDialog from "./AlertUpdatDialog";
import { useState, useContext, useEffect, useMemo } from "react";
import { ToDoListArrayFromContext } from "../Contexts/ToDoListArrayFromComtext";
import { openSnackbar } from "../Contexts/ToDoListArrayFromComtext";
import { v4 as uuidv4 } from "uuid";

export default function ToDoListApp() {
  const { toDoArray, setToDoArray } = useContext(ToDoListArrayFromContext);
  const [TextFieldInput, setTextFieldInput] = useState("");
  const [activatedButtons, setActivatedButtons] = useState("all");
  const { updatSnackBar, setUpdatSnackBar } = useContext(openSnackbar);
  useEffect(() => {
    setToDoArray(JSON.parse(localStorage.getItem("toDoArray")) ?? []);
  }, []);
  function handdleAddButton() {
    const updatedToDoList = [
      ...toDoArray,
      { id: uuidv4(), toDoContext: TextFieldInput, iscompleted: false },
    ];
    setToDoArray(updatedToDoList);
    localStorage.setItem("toDoArray", JSON.stringify(updatedToDoList));
    setTextFieldInput("");
    setUpdatSnackBar({
      ...updatSnackBar,
      context: "Added successfully",
      statusSnackBar: true,
    });
  }

  const activeTodos = useMemo(() => {
    return toDoArray.filter((t) => {
      return !t.iscompleted;
    });
  }, [toDoArray]);
  const completedTodos = useMemo(() => {
    return toDoArray.filter((t) => {
      return t.iscompleted;
    });
  }, [toDoArray]);
  const allTodos = toDoArray;
  let todosToBeRendered;
  if (activatedButtons == "active") {
    todosToBeRendered = activeTodos ?? [];
  } else if (activatedButtons == "completed") {
    todosToBeRendered = completedTodos ?? [];
  } else {
    todosToBeRendered = allTodos;
  }
  const todosWillShow = todosToBeRendered.map((todo) => (
    <ToDo
      key={todo.id}
      Eid={todo.id}
      toDoContext={todo.toDoContext}
      iscompleted={todo.iscompleted}
    ></ToDo>
  ));
  const handleToggleButtonGroupChange = (e) => {
    setActivatedButtons(e.target.value);
  };

  return (
    <>
      <div className="todo-list-app">
        <div className="todo-list-app-header">
          <TextField
            value={TextFieldInput}
            className="text-field"
            label="Add Todo"
            variant="outlined"
            onChange={(e) => setTextFieldInput(e.target.value)}
          />
          <Button
            className="add-button"
            variant="outlined"
            disabled={TextFieldInput == "" ? true : false}
            onClick={() => {
              handdleAddButton();
            }}
          >
            Add
          </Button>
        </div>
        <ToggleButtonGroup
          color="primary"
          value={activatedButtons}
          exclusive
          style={{ marginBottom: "10px" }}
          onChange={handleToggleButtonGroupChange}
          aria-label="Platform"
        >
          <ToggleButton value="all">ALL</ToggleButton>
          <ToggleButton value="active">ACTIVE</ToggleButton>
          <ToggleButton value="completed">COMPLETED</ToggleButton>
        </ToggleButtonGroup>
        <div className="todo-list-body">{todosWillShow}</div>
      </div>
      <AlertDialog />
      <AlertUpdatDialog />
    </>
  );
}
