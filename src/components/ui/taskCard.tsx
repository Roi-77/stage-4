import { useState } from 'react';
import { type Task } from '../../context/taskContext';
import Button from './button';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const statusStyles: Record<Task['status'], string> = {
  todo: 'border-blue-400 bg-blue-50/50',
  'in-progress': 'border-yellow-400 bg-yellow-50/50',
  done: 'border-green-400 bg-green-50/50'
};

const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const saveEdit = () => {
    const nextTitle = editTitle.trim();

    if (nextTitle) {
      onEdit(task.id, nextTitle);
    } else {
      setEditTitle(task.title);
    }

    setIsEditing(false);
  };

  return (
    <div className={`glass p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 border-2 ${statusStyles[task.status]}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0 space-y-2">
          {isEditing ? (
            <input
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              onBlur={saveEdit}
              onKeyDown={(event) => {
                if (event.key === 'Enter') saveEdit();
                if (event.key === 'Escape') {
                  setEditTitle(task.title);
                  setIsEditing(false);
                }
              }}
              className="w-full p-3 rounded-2xl bg-white/90 border-2 border-indigo-200/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 text-lg font-semibold shadow-sm"
              autoFocus
            />
          ) : (
            <h3
              className="text-xl font-bold text-slate-900 cursor-pointer hover:text-indigo-700 transition-colors line-clamp-2"
              onClick={() => setIsEditing(true)}
            >
              {task.title}
            </h3>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium shadow-sm">
              {task.category}
            </span>
            <span className={`px-2.5 py-1 border rounded-full text-xs font-semibold shadow-sm ${
              task.source === 'api'
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200/50'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
            }`}>
              {task.tag}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0 ml-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => (isEditing ? saveEdit() : setIsEditing(true))}
            className="p-2 hover:scale-105"
            title={isEditing ? 'Save' : 'Edit'}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(task.id)}
            className="p-2 hover:scale-105"
            title="Delete task"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/30">
        <span className={`px-3 py-1.5 rounded-xl text-sm font-semibold shadow-sm capitalize ${
          task.status === 'done'
            ? 'bg-green-100 text-green-800 border border-green-200/50'
            : task.status === 'in-progress'
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200/50'
              : 'bg-blue-100 text-blue-800 border border-blue-200/50'
        }`}>
          {task.status.replace('-', ' ').toUpperCase()}
        </span>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => onToggle(task.id)}
          className="p-3 hover:scale-110 transition-all shadow-md hover:shadow-lg"
          title={task.completed ? 'Mark pending' : 'Mark done'}
        >
          <span className={`text-sm font-bold transition-all ${task.completed ? 'text-green-700' : 'text-slate-600'}`}>
            {task.completed ? 'Done' : 'Pending'}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
