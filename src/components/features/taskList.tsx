import { useTasks, type Task } from '../../context/taskContext';
import TaskCard from '../ui/taskCard';
import Button from '../ui/button';

const TaskList = () => {
  const { state, dispatch } = useTasks();

  // Filter & Search Logic
  const filteredTasks = state.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(state.search.toLowerCase()) ||
                         task.category.toLowerCase().includes(state.search.toLowerCase());
    const matchesFilter = state.filter === 'all' || task.status === state.filter;
    return matchesSearch && matchesFilter;
  });

  // Status counts
  const getStatusCount = (status: string) => state.tasks.filter(t => t.status === status).length;

  const statusOptions = [
    { id: 'all', label: 'All', count: state.tasks.length },
    { id: 'todo', label: 'To Do', count: getStatusCount('todo') },
    { id: 'in-progress', label: 'In Progress', count: getStatusCount('in-progress') },
    { id: 'done', label: 'Done', count: getStatusCount('done') }
  ];

  return (
    <main className="max-w-6xl mx-auto p-6 lg:p-8 space-y-8">
      {/* Filters & Search */}
      <div className="glass p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-3">
            {statusOptions.map(({ id, label, count }) => (
              <Button
                key={id}
                variant={state.filter === id ? 'primary' : 'secondary'}
                size="md"
                onClick={() => dispatch({ type: 'SET_FILTER', payload: id })}
                className="whitespace-nowrap"
              >
                {label} 
                {count > 0 && ` (${count})`}
              </Button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="🔍 Search tasks or categories..."
              value={state.search}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="w-full pl-12 pr-6 py-4 rounded-3xl bg-white/70 border-2 border-white/50 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/30 text-lg placeholder-slate-500 shadow-lg"
            />
            {state.search && (
              <button
                onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 p-1 rounded-full hover:bg-white/50 transition-all"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={(id) => dispatch({ type: 'TOGGLE_TASK', payload: id })}
              onDelete={(id) => dispatch({ type: 'DELETE_TASK', payload: id })}
            />
          ))}
        </div>
      ) : (
        <div className="glass p-20 rounded-3xl text-center shadow-xl">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">No tasks match your search</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto">
            Try adjusting your filters or search terms
          </p>
          <Button size="lg" className="mx-auto">
            Clear Filters
          </Button>
        </div>
      )}
    </main>
  );
};

export default TaskList;