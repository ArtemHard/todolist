import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList/TodoList";

function App() {

    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"


    const tasks_1: Array<TaskType> = [
        {id: 1, title: "html", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
