import { v1 } from "uuid";
import { TasksStateType } from "../App";

export const tasksReducer = (
  state: TasksStateType,
  action: TaskACTypes
): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK": {
      let newTask = { id: v1(), title: action.payload.title, isDone: false };
      let todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = [newTask, ...todolistTasks];
      return { ...state };
    }

    case "REMOVE-TASK": {
      // state[action.payload.todolistId].filter(
      //   (t) => t.id !== action.payload.id
      // );
      const todolistTasks = state[action.payload.todolistId];
      state[action.payload.todolistId] = todolistTasks.filter(
        (t) => t.id !== action.payload.id
      );
      return { ...state };
    }

    case "CHANGE-STATUS": {
      const todolistTasks = state[action.payload.todolistId];
      const task = todolistTasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.isDone = action.payload.isDone;
      }
      return { ...state };
    }

    case "CHANGE-TASK-TITLE": {
      state[action.payload.todolistId].forEach((el) => {
        if (el.id === action.payload.id) {
          el.title = action.payload.newTitle;
        }
      });
      return { ...state };
    }

    case "REMOVE-TODO-LIST": {
      delete state[action.payload.id];
      return { ...state };
    }

    case "ADD-TASK-LIST": {
      return {
        ...state,
        [action.payload.newTodolistId]: [],
      };
    }
    default:
      return state;
  }
};
type TaskACTypes =
  | addTaskACType
  | removeTaskACType
  | changeStatusACType
  | changeTaskTitleACType
  | removeTasklistACType
  | addTasklistACType;
type removeTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (id: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK" as const,
    payload: {
      id,
      todolistId,
    },
  } as const;
};

type addTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK" as const,
    payload: {
      title,
      todolistId,
    },
  } as const;
};

type changeStatusACType = ReturnType<typeof changeStatusAC>;
export const changeStatusAC = (
  id: string,
  isDone: boolean,
  todolistId: string
) => {
  return {
    type: "CHANGE-STATUS" as const,
    payload: {
      id,
      isDone,
      todolistId,
    },
  } as const;
};

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
export const changeTaskTitleAC = (
  id: string,
  newTitle: string,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASK-TITLE" as const,
    payload: {
      id,
      newTitle,
      todolistId,
    },
  } as const;
};

type removeTasklistACType = ReturnType<typeof removeTasklistAC>;
export const removeTasklistAC = (id: string) => {
  return {
    type: "REMOVE-TODO-LIST" as const,
    payload: {
      id,
    },
  } as const;
};

type addTasklistACType = ReturnType<typeof addTasklistAC>;
export const addTasklistAC = (newTodolistId: string, title: string) => {
  return {
    type: "ADD-TASK-LIST" as const,
    payload: {
      newTodolistId,
      title,
    },
  } as const;
};
