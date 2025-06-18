import { createContext, useReducer, useContext, useEffect } from "react";
import type { Task } from "../interfaces/Tasks";

type TaskAction = 
    { type: 'ADD_TASK', payload: Task }
    | { type: 'UPDATE_TASK', payload: Task }
    | { type: 'DELETE_TASK', payload: string }

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void; 
};

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'UPDATE_TASK':
      return state.map(task => task.id === action.payload.id ? action.payload : task);
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => dispatch({ type: 'ADD_TASK', payload: task });
  const updateTask = (task: Task) => dispatch({ type: 'UPDATE_TASK', payload: task });
  const deleteTask = (id: string) => dispatch({ type: 'DELETE_TASK', payload: id });

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
  return context;
};


