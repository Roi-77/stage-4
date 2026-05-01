import { type Task, type TaskStatus } from '../context/taskContext';

interface ApiTask {
  id?: string | number;
  title?: string;
  category?: string;
  status?: string;
  completed?: boolean;
  userId?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TASKS_PATH = import.meta.env.VITE_API_TASKS_PATH ?? '/todos?_limit=8';

const sampleApiTasks: ApiTask[] = [
  { id: 'sample-1', title: 'Review public API response mapping', completed: false, category: 'API', status: 'in-progress' },
  { id: 'sample-2', title: 'Create local fallback data', completed: true, category: 'Frontend', status: 'done' },
  { id: 'sample-3', title: 'Validate production environment variables', completed: false, category: 'DevOps', status: 'todo' },
  { id: 'sample-4', title: 'Display dynamic tasks in the UI', completed: false, category: 'UI', status: 'todo' }
];

const isTaskStatus = (status: string | undefined): status is TaskStatus =>
  status === 'todo' || status === 'in-progress' || status === 'done';

const getDerivedStatus = (task: ApiTask, index: number): TaskStatus => {
  if (isTaskStatus(task.status)) return task.status;
  if (task.completed) return 'done';
  return index % 3 === 0 ? 'in-progress' : 'todo';
};

const getCategory = (task: ApiTask) => {
  if (task.category?.trim()) return task.category.trim();
  if (task.userId) return `User ${task.userId}`;
  return 'Public API';
};

const normalizeTask = (task: ApiTask, index: number): Task => {
  const status = getDerivedStatus(task, index);

  return {
    id: `api-${task.id ?? index}`,
    title: task.title?.trim() || 'Untitled API task',
    category: getCategory(task),
    status,
    completed: status === 'done',
    source: 'api',
    tag: 'Public API'
  };
};

const getTasksEndpoint = () => {
  if (!API_BASE_URL) return null;
  return `${API_BASE_URL.replace(/\/$/, '')}${API_TASKS_PATH}`;
};

export const fetchProductionTasks = async (): Promise<Task[]> => {
  const endpoint = getTasksEndpoint();

  if (!endpoint) {
    return sampleApiTasks.map(normalizeTask);
  }

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Task API returned ${response.status}`);
    }

    const data = await response.json();
    const tasks = Array.isArray(data) ? data : data.tasks;

    if (!Array.isArray(tasks)) {
      throw new Error('Task API response must be an array or { tasks: [] }');
    }

    return tasks.map(normalizeTask);
  } catch (error) {
    console.error('Falling back to sample API tasks:', error);
    return sampleApiTasks.map(normalizeTask);
  }
};
