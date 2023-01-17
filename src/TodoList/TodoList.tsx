import React, { FC, KeyboardEvent, useState } from "react";
import { FilterValueType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValueType) => void;
  addTask: (title: string) => void;
};
const TodoList: FC<TodoListPropsType> = (props) => {
  const [title, setTitle] = useState<string>("");

  let tasksList;
  if (props.tasks.length === 0) {
    tasksList = <span>Your task is empty</span>;
  } else {
    tasksList = props.tasks.map((task: TaskType) => {
      const removeTask = () => props.removeTask(task.id);

      return (
        <li key={task.id}>
          <input type='checkbox' checked={task.isDone} />
          <span>{task.title}</span>
          <button onClick={removeTask}>Button</button>
        </li>
      );
    });
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.addTask(title);
      setTitle("");
    }
  };

  const handlerCreator = (filter: FilterValueType) => () =>
    props.changeFilter(filter);
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type='text'
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button
          onClick={() => {
            props.addTask(title);
            setTitle("");
          }}
        >
          +
        </button>
      </div>
      <ul>{tasksList}</ul>
      <div>
        <button onClick={handlerCreator("all")}>All</button>
        <button onClick={handlerCreator("active")}>Active</button>
        <button onClick={handlerCreator("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
