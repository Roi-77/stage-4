import { createContext, useContext, useReducer, useEffect,  } from 'react';
import { type ReactNode, type Dispatch } from 'react';

export interface Task {
  id: string;
  title: string;
  category: string;
  status: 'todo' | 'in-progress' | 'done';
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  filter: string;
  search: string;
}

type TaskAction =

  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'completed'> }
  | { type: 'TOGGLE_TASK'; payload: string }

  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }

  | { type: 'LOAD_TASKS'; payload: Task[] };

  interface TaskContextType {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { 
          ...action.payload, 
          id: Date.now().toString(),
          completed: false 
        }]
      };
      
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
      
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
      
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
      
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
      
    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload };
      
    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: 'all',
    search: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('taskflow-tasks');
      if (saved) {
        dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(saved) });
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('taskflow-tasks', JSON.stringify(state.tasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};