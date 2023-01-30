import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import TodoList from "./TodoList/TodoList";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  const filteredTasks = () => {
    let tasksForTodolist = tasks;

    if (filter === "active") {
      return (tasksForTodolist = tasks.filter((t) => !t.isDone));
    }
    if (filter === "completed") {
      return (tasksForTodolist = tasks.filter((t) => t.isDone));
    }
    return tasksForTodolist;
  };

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  const changeStatus = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, isDone: !t.isDone } : t))
    );
  };

  return (
    <div className='App'>
      <TodoList
        title='What to learn'
        tasks={filteredTasks()}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      ></TodoList>
    </div>
  );
}

export default App;

//-------------------------------------------------------------------------------------------------------
/*
export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  return (
    <div className='App'>
      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      >
        <div>
          <div>Many intresting information</div>
          <div>Many intresting information</div>
          <div>Many intresting information</div>
          <div>Many intresting information</div>
          <div>Many intresting information</div>
        </div>
      </Todolist>

      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      >
        <div>
          <div>A lot of boring information</div>
          <div>A lot of boring information</div>
          <div>A lot of boring information</div>
          <input placeholder={"A lot of boring information"} />
          <div>
            <button>Boring Button 1</button>
            <button>Boring Button 2</button>
            <button>Boring Button 3</button>
          </div>
        </div>
      </Todolist>

      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
*/
/*
type PropsType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Array<PropsType>>([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTodos(res.data);
    });
  }, []);

  const onClickHandler = () => {
    setTodos([]);
  };

  const onClickHandlerRedisplay = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
      setTodos(res.data);
    });
  };

  const [parent] = useAutoAnimate<HTMLLIElement>({ duration: 900 });
  const mapTodos = todos.map((el) => {
    return (
      <li key={el.id} ref={parent}>
        <span>{el.id} - </span>
        <span>{el.title}</span>
        <span>{el.completed}</span>
      </li>
    );
  });

  return (
    <div className='App'>
      <button onClick={onClickHandler}>CLEAN POSTS</button>
      <button onClick={onClickHandlerRedisplay}>Redisplay</button>
      <ul>{mapTodos}</ul>
    </div>
  );
}

export default App;
*/
