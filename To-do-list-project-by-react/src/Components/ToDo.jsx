import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import "./ToDo.css";
// import { useState } from 'react';
import { useContext } from "react";
import { ToDoListArrayFromContext } from "../Contexts/ToDoListArrayFromComtext";
import { openDeletDialog } from "../Contexts/ToDoListArrayFromComtext";
import { openUpdatDialog } from "../Contexts/ToDoListArrayFromComtext";
import PropTypes from "prop-types";
ToDo.propTypes = {
  toDoContext: PropTypes.any.isRequired,
  iscompleted: PropTypes.bool.isRequired,
  Eid: PropTypes.any.isRequired,
};
export default function ToDo({ Eid, toDoContext, iscompleted }) {
  const { toDoArray, setToDoArray } = useContext(ToDoListArrayFromContext);
  const { deletDialog, setDeletDialog } = useContext(openDeletDialog);
  const { updatDialog, setUpdatDialog } = useContext(openUpdatDialog);
  function handleCheckClick() {
    const updatedToDoList = toDoArray.map((t) => {
      if (t.id == Eid) {
        t.iscompleted = !t.iscompleted;
      }
      return t;
    });
    setToDoArray(updatedToDoList);
    localStorage.setItem("toDoArray", JSON.stringify(updatedToDoList));
  }
  const handleRemoveDialogOpen = (e) => {
    const Eid = e.target.parentNode.id;
    setDeletDialog({ ...deletDialog, EId: Eid, statusE: true });
  };
  const handleUpdatDialogOpen = (e) => {
    const Eid = e.target.parentNode.id;
    const EValue = e.target.parentNode.getAttribute("data-context");
    setUpdatDialog({
      ...updatDialog,
      EId: Eid,
      preTodoValue: EValue,
      statusE: true,
    });
  };
  return (
    <>
      <div className={`todo`} id={Eid} data-context={toDoContext}>
        <Checkbox
          className="check-box checked"
          checked={iscompleted}
          onClick={() => {
            handleCheckClick();
          }}
        />
        <h3 className={`todo-body ${iscompleted ? "complete" : ""}`}>
          {toDoContext}
        </h3>
        <Button
          className="remove-todo-button"
          variant="outlined"
          color="info"
          onClick={handleUpdatDialogOpen}
        >
          Update
        </Button>
        <Button
          className="remove-todo-button"
          variant="outlined"
          color="error"
          onClick={handleRemoveDialogOpen}
        >
          Remove
        </Button>
      </div>
    </>
  );
}
