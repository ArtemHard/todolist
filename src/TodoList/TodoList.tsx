import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  filter: FilterValuesType;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeStatus: (id: string) => void;
};
const TodoList: FC<TodoListPropsType> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState(false);

  let tasksList;
  if (props.tasks.length === 0) {
    tasksList = <span>Your task is empty</span>;
  } else {
    tasksList = props.tasks.map((task: TaskType) => {
      const removeTask = () => props.removeTask(task.id);
      const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(task.id);
      };
      const taskClasses = task.isDone ? "task done" : "task";

      return (
        <li key={task.id} className={taskClasses}>
          <input
            type='checkbox'
            checked={task.isDone}
            onChange={onChangeHandler}
          />
          <span>{task.title}</span>
          <button onClick={removeTask}>Button</button>
        </li>
      );
    });
  }

  const addTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      setError(false);
      props.addTask(title);
    } else {
      setError(true);
    }
    setTitle("");
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && addTask();
  };

  const handlerCreator = (filter: FilterValuesType) => () =>
    props.changeFilter(filter);

  const errorMessage = error && (
    <p style={{ color: "red", fontWeight: "bold", margin: 0 }}>
      Title is require!
    </p>
  );
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type='text'
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "input-error" : ""}
        />
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>
      <ul>{tasksList}</ul>
      <div>
        <button
          className={props.filter === "all" ? "btn-active" : ""}
          onClick={handlerCreator("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "btn-active" : ""}
          onClick={handlerCreator("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "btn-active" : ""}
          onClick={handlerCreator("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
