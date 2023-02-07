import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";
import { EditSpan } from "./components/EditSpan";
import { SuperInput } from "./components/SuperInput";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  filter: FilterValuesType;
  editTask: (todolistID: string, taskID: string, newTask: string) => void;
  editTodo: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
  const removeTodolist = () => props.removeTodolist(props.id);

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const addTaskHandler = (newTitle: string) => {
    props.addTask(newTitle, props.id);
  };

  const editTaskHandler = (tID: string, newTitle: string) => {
    props.editTask(props.id, tID, newTitle);
  };

  const editTodoHandler = (newTitle: string) => {
    props.editTodo(props.id, newTitle);
  };

  return (
    <div>
      <h3>
        {" "}
        {props.title}
        <button onClick={removeTodolist}>x</button>
      </h3>
      <SuperInput callBack={addTaskHandler} />
      {/*<div>*/}
      {/*    <input value={title}*/}
      {/*           onChange={onChangeHandler}*/}
      {/*           onKeyPress={onKeyPressHandler}*/}
      {/*           className={error ? "error" : ""}*/}
      {/*    />*/}
      {/*    <button onClick={addTask}>+</button>*/}
      {/*    {error && <div className="error-message">{error}</div>}*/}
      {/*</div>*/}
      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(t.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
          };
          // const editTaskHandler = (newTitle: string) => {
          //   props.editTask(props.id, t.id, newTitle);
          // };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type='checkbox'
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              {/* <span>{t.title}</span> */}
              <EditSpan
                OLDtitle={t.title}
                callback={(newTitle) => editTaskHandler(t.id, newTitle)}
              />
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
