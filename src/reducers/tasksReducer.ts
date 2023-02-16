import { TaskType } from "../Todolist";
import { v1 } from "uuid";

export const tasksReducer = (
  state: TaskType[],
  action: TsarType
): TaskType[] => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return state.filter((el) => el.id !== action.payload.id);
    }
    case "ADD-TASK": {
      let newTask = { id: v1(), title: action.payload.title, isDone: false };
      // let newTasks = [task, ...tasks];
      // setTasks(newTasks);
      return [newTask, ...state];
    }

    default:
      return state;
  }
};
type TsarType = removeTaskACType | addTaskACType;
type removeTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (id: string) => {
  return {
    type: "REMOVE-TASK" as const,
    payload: {
      id: id,
    },
  } as const;
};

type addTaskACType = ReturnType<typeof addTaskAC>;
export const addTaskAC = (title: string) => {
  return {
    type: "ADD-TASK" as const,
    payload: { title },
  } as const;
};
