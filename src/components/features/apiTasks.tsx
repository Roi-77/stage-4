import { type Task, type TaskStatus } from '../../context/taskContext';

interface ApiTask {
  id?: string | number;
  title?: string;
  category?: string;
  status?: string;
  completed?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fallbackApiTasks: ApiTask[] = [
  { id: 'api-1', title: 'Update React component library', completed: false, category: 'Frontend', status: 'in-progress' },
  { id: 'api-2', title: 'Deploy API to production server', completed: true, category: 'DevOps', status: 'done' },
  { id: 'api-3', title: 'Write comprehensive test suite', completed: false, category: 'Testing', status: 'todo' },
  { id: 'api-4', title: 'Design new admin dashboard', completed: false, category: 'Design', status: 'todo' },
  { id: 'api-5', title: 'Optimize database performance', completed: true, category: 'Backend', status: 'done' },
  { id: 'api-6', title: 'Set up CI/CD pipeline', completed: false, category: 'DevOps', status: 'in-progress' }
];

const isTaskStatus = (status: string | undefined): status is TaskStatus =>
  status === 'todo' || status === 'in-progress' || status === 'done';

const normalizeTask = (task: ApiTask, index: number): Task => {
  const completed = task.completed ?? task.status === 'done';
  const status = isTaskStatus(task.status) ? task.status : completed ? 'done' : 'todo';

  return {
    id: `api-${task.id ?? index}`,
    title: task.title?.trim() || 'Untitled API task',
    category: task.category?.trim() || 'API',
    status,
    completed: status === 'done',
    source: 'api',
    tag: 'Production'
  };
};

const getTasksEndpoint = () => {
  if (!API_BASE_URL) return null;
  return `${API_BASE_URL.replace(/\/$/, '')}/tasks`;
};

export const fetchProductionTasks = async (): Promise<Task[]> => {
  const endpoint = getTasksEndpoint();

  if (!endpoint) {
    return fallbackApiTasks.map(normalizeTask);
  }

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
};
