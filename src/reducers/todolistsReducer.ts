import { FilterValuesType, TodolistType } from "../App";

export const todolistsReducer = (
  state: TodolistType[],
  action: TodolistActionType
): TodolistType[] => {
  switch (action.type) {
    case "ADD-TODO-LIST": {
      const newTodolist = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "all" as const,
      };
      return [newTodolist, ...state];
    }

    case "CHANGE-TODO-LIST-TITLE": {
      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) {
        todolist.title = action.payload.title;
      }
      return [...state];
    }
    case "CHANGE-FILTER": {
      const todolist = state.find((tl) => tl.id === action.payload.todolistId);
      if (todolist) todolist.filter = action.payload.value;
      return [...state];
    }
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }
    default:
      return state;
  }
};

type TodolistActionType =
  | addTodolistACType
  | changeTodolistTitle
  | changeFilterTodoList
  | removeTodolist;

type addTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (id: string, title: string) => {
  return {
    type: "ADD-TODO-LIST" as const,
    payload: {
      id,
      title,
    },
  } as const;
};

type changeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE-TODO-LIST-TITLE" as const,
    payload: {
      id,
      title,
    } as const,
  };
};

type changeFilterTodoList = ReturnType<typeof changeFilterTodoListAC>;
export const changeFilterTodoListAC = (
  value: FilterValuesType,
  todolistId: string
) => {
  return {
    type: "CHANGE-FILTER" as const,
    payload: {
      value,
      todolistId,
    },
  } as const;
};

type removeTodolist = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST" as const,
    payload: {
      id,
    },
  } as const;
};
