import Button from '../ui/button';
import { useTasks, type Task } from '../../context/taskContext';
import NewTaskModal from '../features/newTaskModal';
import { useState } from 'react';


const Header = () => {
  const { state, dispatch } = useTasks();

  const [showModal, setShowModal] = useState(false);

  const handleAddTask = (task: Task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };
  
  
  const getStats = () => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.status === 'done').length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getStats();

  return (
  <header className="glass sticky top-0 z-50 p-6 backdrop-blur-xl border-b border-white/20 shadow-xl">
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Logo & Stats */}
      <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6">
        <div className="flex flex-col items-center lg:items-start gap-2">
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
            TaskFlow
            <span className="text-sm font-normal text-slate-500 ml-2">v1.0</span>
          </h1>
          <div className="flex items-center gap-6 text-sm text-slate-600 bg-white/50 px-4 py-2 rounded-2xl">
            <span>📊 {stats.pending} pending</span>
            <span>•</span>
            <span>✅ {stats.completed} done</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="flex bg-white/30 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
            <button className="px-4 py-2 rounded-xl font-semibold text-indigo-700 bg-white shadow-sm hover:shadow-md transition-all">
              Today
            </button>
            <button className="px-4 py-2 rounded-xl text-slate-700 hover:text-indigo-700 hover:bg-white/50 transition-all">
              Week
            </button>
          </div>
          <Button size="lg" onClick={() => setShowModal(true)}>
            + New Task
          </Button>
        </div>
      </div>
      
      
      {/* Modal - Keep your existing modal */}
      <NewTaskModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onAdd={handleAddTask}
      />
    </div>
  </header>
);
};

export default Header;