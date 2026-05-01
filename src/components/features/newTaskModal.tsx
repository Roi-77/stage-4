import { useEffect, useRef, useState } from 'react';
import { type TaskStatus } from '../../context/taskContext';
import Button from '../ui/button';

interface TaskData {
  title: string;
  category: string;
  status: TaskStatus;
}

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: TaskData) => void;
}

const categoryOptions = ['Design', 'Development', 'DevOps', 'Marketing', 'Personal'];

const NewTaskModal = ({ isOpen, onClose, onAdd }: NewTaskModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<TaskData>({
    title: '',
    category: '',
    status: 'todo'
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    window.setTimeout(() => inputRef.current?.focus(), 50);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title.trim()) return;

    onAdd({
      ...formData,
      title: formData.title.trim(),
      category: formData.category || 'General'
    });

    setFormData({ title: '', category: '', status: 'todo' });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-task-title"
    >
      <div
        className="glass w-full max-w-md p-8 rounded-3xl shadow-2xl animate-slide-up"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="new-task-title" className="text-2xl font-bold text-slate-900 mb-6">
          New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/80 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            required
          />

          <select
            value={formData.category}
            onChange={(event) => setFormData({ ...formData, category: event.target.value })}
            className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/80 focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="">Select category</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={formData.status}
            onChange={(event) => setFormData({ ...formData, status: event.target.value as TaskStatus })}
            className="w-full p-4 rounded-2xl border-2 border-white/50 bg-white/80 focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="todo">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" size="lg">
              Create Task
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
