import { useMemo, useState } from 'react';
import { useTasks, type Task } from '../../context/taskContext';
import Button from '../ui/button';
import TaskCard from '../ui/taskCard';
import { Menu } from 'lucide-react';

const statusOptions = [
  { id: 'all', label: 'All Tasks', icon: '📊', color: 'from-slate-500 to-slate-700' },
  { id: 'todo', label: 'Pending', icon: '⏳', color: 'from-yellow-400 to-yellow-600' },
  { id: 'in-progress', label: 'In Progress', icon: '⚡', color: 'from-blue-400 to-blue-600' },
  { id: 'done', label: 'Done', icon: '✅', color: 'from-green-400 to-green-600' },
  { id: 'api', label: 'API Tasks', icon: '🌐', color: 'from-indigo-400 to-indigo-600' },
  { id: 'local', label: 'Local Tasks', icon: '💾', color: 'from-purple-400 to-purple-600' },
];

const TaskList = () => {
  const { state, dispatch, stats } = useTasks();
  const [hoveredFilter, setHoveredFilter] = useState<string>('');

  const filteredTasks = useMemo(() => {
    const query = state.search.trim().toLowerCase();

    return state.tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.tag.toLowerCase().includes(query);

      const matchesFilter =
        state.filter === 'all' ||
        task.status === state.filter ||
        task.source === state.filter;

      return matchesSearch && matchesFilter;
    });
  }, [state.filter, state.search, state.tasks]);

  const getFilterCount = (filterType: string): number => {
    if (filterType === 'all') return stats.total;
    if (filterType === 'api') return stats.api;
    if (filterType === 'local') return stats.local;
    return state.tasks.filter((task) => task.status === filterType).length;
  };

  const handleFilterClick = (filterId: string) => {
    dispatch({ type: 'SET_FILTER', payload: filterId });
  };

  if (state.loading) {
    return (
      <main className="max-w-6xl mx-auto p-6 sm:p-10 text-center space-y-4 animate-pulse">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-700">Initializing Tasks</h2>
        <p className="text-slate-600">Loading local and production tasks...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {state.error && (
        <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5 text-sm font-medium text-amber-800 shadow-lg">
          {state.error}
        </div>
      )}

      {/* Filter Stats - Horizontal Scroll on Mobile */}
      <div className="glass p-5 sm:p-6 lg:p-8 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-xl">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent -mx-1 px-1">
          {statusOptions.map(({ id, label, icon, color }) => {
            const count = getFilterCount(id);
            const isActive = state.filter === id;

            return (
              <FilterStatCard
                key={id}
                icon={icon}
                label={label}
                count={count}
                isActive={isActive}
                color={color}
                onClick={() => handleFilterClick(id)}
                isHovered={hoveredFilter === id}
                onHover={() => setHoveredFilter(id)}
                onHoverLeave={() => setHoveredFilter('')}
              />
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass p-1.5 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-xl max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={`🔍 Search ${stats.total} tasks...`}
            value={state.search}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="w-full pl-14 pr-14 py-6 rounded-3xl bg-white/95 border-2 border-transparent focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/30 text-lg placeholder-slate-500 shadow-xl transition-all"
          />
          {state.search && (
            <button
              onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-2xl hover:bg-slate-100 transition-all"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {state.search && (
          <p className="text-center text-xs text-slate-500 mt-3 font-medium">
            Found {filteredTasks.length} of {stats.total} tasks
          </p>
        )}
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={(id) => dispatch({ type: 'TOGGLE_TASK', payload: id })}
              onDelete={(id) => dispatch({ type: 'DELETE_TASK', payload: id })}
              onEdit={(id, title) => dispatch({ type: 'UPDATE_TASK', payload: { id, title } })}
            />
          ))}
        </div>
      ) : (
        <div className="glass p-12 sm:p-20 rounded-3xl text-center shadow-2xl border border-white/30 max-w-4xl mx-auto">
          <div className="text-7xl mb-8">🔍</div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4">No tasks found</h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-md mx-auto">
            {state.search ? 'Try different search terms' : 'Adjust your filters above'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="primary" 
              onClick={() => {
                dispatch({ type: 'SET_FILTER', payload: 'all' });
                dispatch({ type: 'SET_SEARCH', payload: '' });
              }}
            >
              Show All Tasks
            </Button>
            {state.search && (
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

/* ==================== Filter Stat Card ==================== */
interface FilterStatCardProps {
  icon: string;
  label: string;
  count: number;
  isActive: boolean;
  color: string;
  onClick: () => void;
  isHovered: boolean;
  onHover: () => void;
  onHoverLeave: () => void;
}

const FilterStatCard = ({
  icon,
  label,
  count,
  isActive,
  color,
  onClick,
  onHover,
  onHoverLeave,
}: FilterStatCardProps) => (
  <div
    className={`
      flex flex-col items-center justify-center p-5 sm:p-6 min-w-[130px] sm:min-w-[145px] rounded-3xl cursor-pointer 
      transition-all duration-300 snap-center
      hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03]
      ${isActive 
        ? `bg-gradient-to-br ${color} text-white shadow-2xl ring-4 ring-white/60` 
        : 'bg-white/90 hover:bg-white shadow-lg border border-white/50'
      }
    `}
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onHoverLeave}
  >
    <div className="text-3xl mb-2">{icon}</div>
    
    <div className={`text-2xl font-black mb-1 ${isActive ? 'text-white drop-shadow' : 'text-slate-900'}`}>
      {count}
    </div>
    
    <div className={`text-xs font-bold uppercase tracking-widest text-center leading-tight ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
      {label}
    </div>
  </div>
);

export default TaskList;