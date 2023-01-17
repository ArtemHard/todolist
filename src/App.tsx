import React, { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import "./App.css";
import TodoList, { TaskType } from "./TodoList/TodoList";

export type FilterValueType = "all" | "active" | "completed";
function App() {
  const todoListTitle_1 = "What to learn";
  const todoListTitle_2 = "What to buy";

  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: uuidv1(), title: "html", isDone: true },
    { id: uuidv1(), title: "CSS", isDone: true },
    { id: uuidv1(), title: "JS/TS", isDone: false },
  ]);

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const [filter, setFilter] = useState<FilterValueType>("all");
  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };
  const getFilteredTasksForRender = (
    tasks: Array<TaskType>,
    filter: FilterValueType
  ): Array<TaskType> => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => task.isDone === false);
      case "completed":
        return tasks.filter((task) => task.isDone === true);
      default:
        return tasks;
    }
  };
  const filteredTasksForRender = getFilteredTasksForRender(tasks, filter);

  const addTask = (title: string) => {
    const newTask = {
      id: uuidv1(),
      title: title,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className='App'>
      <TodoList
        title={todoListTitle_1}
        tasks={filteredTasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
