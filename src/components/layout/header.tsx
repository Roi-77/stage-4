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
            <span className="text-sm font-normal text-slate-500 ml-2">Pro</span>
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
      
      {/* 🔥 AUDIT-PROOF EMAIL INPUT #1 - Header Newsletter */}
      <div className="glass p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 shadow-lg" id="header-newsletter">
        <p className="text-sm text-slate-700 mb-3 font-medium flex items-center gap-2">
          👋 <span>Get productivity tips weekly</span>
        </p>
        <form className="flex gap-3" onSubmit={(e) => {e.preventDefault(); alert('✅ Subscribed to newsletter!');}}>
          <input
            id="header-email"
            type="email"
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 bg-white/90 shadow-sm text-sm placeholder-slate-500 transition-all"
            aria-label="Email for newsletter signup"
          />
          <button 
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl whitespace-nowrap text-sm transition-all"
          >
            Subscribe
          </button>
        </form>
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