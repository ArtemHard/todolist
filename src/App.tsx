import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList/TodoList";

export type FilterValueType = 'all'|'active'|"completed"
function App() {

    const todoListTitle_1 = "What to learn"
    const todoListTitle_2 = "What to buy"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "html", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== task.id))
    }

    const [filter, setFilter] = useState<FilterValueType>('all')
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const getFilteredTasksForRender = (tasks: Array<TaskType>, filter: FilterValueType ) : Array<TaskType> => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => task.isDone === false)
        case 'completed':
            return tasks.filter(task => task.isDone === true)
        default:
            return tasks
    }
    }
    const filteredTasksForRender = getFilteredTasksForRender(tasks, filter)
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={filteredTasksForRender} removeTask={removeTask} changeFilter={changeFilter} />
        </div>
    );
}

export default App;
