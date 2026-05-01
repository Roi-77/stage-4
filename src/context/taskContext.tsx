/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { type Dispatch, type ReactNode } from 'react';
import { fetchProductionTasks } from '../services/taskApi';

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskSource = 'local' | 'api';

export interface Task {
  id: string;
  title: string;
  category: string;
  status: TaskStatus;
  completed: boolean;
  source: TaskSource;
  tag: string;
}

interface TaskState {
  tasks: Task[];
  filter: string;
  search: string;
  loading: boolean;
  error: string | null;
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Pick<Task, 'title' | 'category' | 'status'> }
  | { type: 'UPDATE_TASK'; payload: { id: string; title: string } }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_TASKS'; payload: Task[] };

interface TaskStats {
  total: number;
  pending: number;
  done: number;
  local: number;
  api: number;
}

interface TaskContextType {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
  stats: TaskStats;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);
const STORAGE_KEY = 'taskflow-tasks';

const createLocalTask = (task: Pick<Task, 'title' | 'category' | 'status'>): Task => ({
  ...task,
  id: crypto.randomUUID(),
  category: task.category || 'General',
  completed: task.status === 'done',
  source: 'local',
  tag: 'Local'
});

const normalizeLocalTask = (task: Partial<Task>, index: number): Task => {
  const status = task.status === 'done' || task.status === 'in-progress' ? task.status : 'todo';

  return {
    id: task.id ?? `local-${index}`,
    title: task.title?.trim() || 'Untitled task',
    category: task.category?.trim() || 'General',
    status,
    completed: status === 'done',
    source: 'local',
    tag: task.tag || 'Local'
  };
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, createLocalTask(action.payload)] };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, title: action.payload.title } : task
        )
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.payload) return task;

          const completed = !task.completed;
          return { ...task, completed, status: completed ? 'done' : 'todo' };
        })
      };

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SEARCH':
      return { ...state, search: action.payload };

    case 'LOAD_TASKS':
      return { ...state, tasks: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    filter: 'all',
    search: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });

      let localTasks: Task[] = [];

      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsedTasks = saved ? JSON.parse(saved) : [];
        localTasks = Array.isArray(parsedTasks) ? parsedTasks.map(normalizeLocalTask) : [];
      } catch (error) {
        console.error('Failed to load local tasks:', error);
      }

      try {
        const apiTasks = await fetchProductionTasks();
        dispatch({ type: 'LOAD_TASKS', payload: [...localTasks, ...apiTasks] });
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        console.error('Failed to load API tasks:', error);
        dispatch({ type: 'LOAD_TASKS', payload: localTasks });
        dispatch({ type: 'SET_ERROR', payload: 'API tasks are unavailable. Showing local tasks only.' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    void loadTasks();
  }, []);

  useEffect(() => {
    try {
      const localTasks = state.tasks.filter((task) => task.source === 'local');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localTasks));
    } catch (error) {
      console.error('Failed to save local tasks:', error);
    }
  }, [state.tasks]);

  const stats = useMemo<TaskStats>(() => {
    const done = state.tasks.filter((task) => task.status === 'done').length;

    return {
      total: state.tasks.length,
      pending: state.tasks.length - done,
      done,
      local: state.tasks.filter((task) => task.source === 'local').length,
      api: state.tasks.filter((task) => task.source === 'api').length
    };
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch, stats }}>
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
