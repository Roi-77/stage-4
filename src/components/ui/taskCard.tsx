import { useState } from 'react';
import Button from './button';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const getStatusStyles = (status) => {
    const styles = {
      todo: 'border-blue-400 bg-blue-50/50',
      'in-progress': 'border-yellow-400 bg-yellow-50/50',
      done: 'border-green-400 bg-green-50/50'
    };
    return styles[status] || 'border-slate-400 bg-slate-50/50';
  };

  const handleEdit = () => {
    if (isEditing && editTitle.trim()) {
      onEdit?.(task.id, editTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`glass p-6 rounded-3xl hover:shadow-2xl transition-all duration-300 border-2 ${getStatusStyles(task.status)}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white/80 border-2 border-white/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 text-lg font-semibold"
              autoFocus
            />
          ) : (
            <h3 className="text-xl font-bold text-slate-900 truncate">{task.title}</h3>
          )}
          <p className="text-slate-600 mt-1">{task.category}</p>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <Button 
            size="sm" 
            variant="secondary"
            onClick={handleEdit}
            className="p-2"
          >
            {isEditing ? '✅' : '✏️'}
          </Button>
          <Button 
            size="sm" 
            variant="danger"
            onClick={() => onDelete(task.id)}
            className="p-2"
          >
            🗑️
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/30">
        <span className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize ${
          task.status === 'done' 
            ? 'bg-green-200 text-green-800' 
            : task.status === 'in-progress'
            ? 'bg-yellow-200 text-yellow-800'
            : 'bg-blue-200 text-blue-800'
        }`}>
          {task.status.replace('-', ' ')}
        </span>
        
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onToggle(task.id)}
          className="p-2"
        >
          {task.completed ? '✅' : '○'}
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;