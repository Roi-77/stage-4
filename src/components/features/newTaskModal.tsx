import { useState, useEffect, useRef } from 'react';
import Button from '../ui/button';

const NewTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ title: '', category: '', status: 'todo' });
  const inputRef = useRef(null);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    if (isOpen) inputRef.current?.focus(); // Auto-focus input
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd({ ...formData, id: Date.now() }); // Added ID generation
      setFormData({ title: '', category: '', status: 'todo' });
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose} // Close on backdrop click
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="glass w-full max-w-md p-8 rounded-3xl shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6">New Task</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="What needs to be done?" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/80 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            required 
          />
          
          <select 
            value={formData.category} 
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/80 focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">Select category</option>
            {['Design', 'Development', 'DevOps', 'Marketing', 'Personal'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" size="lg">Create Task</Button>
            <Button type="button" variant="secondary" onClick={onClose} size="lg">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
