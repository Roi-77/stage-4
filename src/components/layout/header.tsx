import { useState } from 'react';
import { useTasks, type TaskStatus } from '../../context/taskContext';
import NewTaskModal from '../features/newTaskModal';
import Button from '../ui/button';
import { Menu, X } from 'lucide-react';

interface NewTaskInput {
  title: string;
  category: string;
  status: TaskStatus;
}

const Header = () => {
  const { dispatch, stats } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddTask = (task: NewTaskInput) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  return (
    <header className="glass sticky top-0 z-50 p-4 sm:p-6 backdrop-blur-xl border-b border-white/20 shadow-xl">
      <div className="max-w-6xl mx-auto">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TaskFlow
              <span className="text-sm font-normal text-slate-500 ml-2 align-super hidden sm:inline">v1.0</span>
            </h1>
          </div>

          {/* Desktop View Toggle */}
          <div className="hidden md:flex bg-white/30 backdrop-blur-sm rounded-2xl p-1 shadow-inner">
            <button className="px-6 py-2.5 rounded-xl font-semibold text-indigo-700 bg-white shadow-sm hover:shadow transition-all">
              Today
            </button>
            <button className="px-6 py-2.5 rounded-xl text-slate-700 hover:text-indigo-700 hover:bg-white/50 transition-all">
              Week
            </button>
          </div>

          {/* Desktop New Task Button */}
          <Button 
            size="lg" 
            className="hidden md:flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            + New Task
          </Button>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-3 md:hidden">
            <Button 
              size="lg" 
              className="text-sm px-5 py-2.5"
              onClick={() => setShowModal(true)}
            >
              + New
            </Button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-2xl hover:bg-white/20 active:bg-white/30 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-5 flex justify-center md:justify-start">
          <div className="flex items-center gap-4 text-sm text-slate-600 bg-white/60 px-5 py-2.5 rounded-2xl backdrop-blur-sm border border-white/30">
            <span>⏳ {stats.pending} pending</span>
            <span aria-hidden="true" className="text-slate-400">•</span>
            <span>✅ {stats.done} done</span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 py-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
            <div className="flex flex-col px-4 space-y-2">
              <div className="px-4 pb-3 text-xs uppercase tracking-widest text-slate-500 font-medium">View</div>
              
              <button className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white/20 active:bg-white/30 transition-all flex items-center gap-3 text-lg">
                📅 Today
              </button>
              <button className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white/20 active:bg-white/30 transition-all flex items-center gap-3 text-lg">
                📆 This Week
              </button>

              <div className="h-px bg-white/20 my-6" />

              <div className="px-4 pb-3 text-xs uppercase tracking-widest text-slate-500 font-medium">Menu</div>
              
              <button className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white/20 active:bg-white/30 transition-all flex items-center gap-3 text-lg">
                📊 Dashboard
              </button>
              <button className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white/20 active:bg-white/30 transition-all flex items-center gap-3 text-lg">
                📁 Projects
              </button>
              <button className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white/20 active:bg-white/30 transition-all flex items-center gap-3 text-lg">
                ⭐ Important
              </button>
              <button className="w-full text-left px-6 py-4 rounded-2xl hover:bg-white/20 active:bg-white/30 transition-all flex items-center gap-3 text-lg">
                ⚙️ Settings
              </button>
            </div>
          </div>
        )}
      </div>

      <NewTaskModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onAdd={handleAddTask} 
      />
    </header>
  );
};

export default Header;