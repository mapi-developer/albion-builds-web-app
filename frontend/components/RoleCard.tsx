import React from 'react';
import { User, ThumbsUp, Calendar, Swords } from 'lucide-react';
import { Role } from '../types/albion';

const RoleCard: React.FC<{ role: Role }> = ({ role }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-amber-500/50 transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full">
      {/* Decorative Background Icon */}
      <div className="absolute -top-6 -right-6 text-slate-800/50 group-hover:text-amber-900/10 transition-colors pointer-events-none">
        <Swords size={120} />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded border bg-slate-800 text-slate-400 border-slate-700 uppercase tracking-wider">
            {role.type}
          </span>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <User size={12} />
            {role.creator_name}
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-amber-400 transition-colors truncate">
          {role.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">
          {role.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4 relative z-10">
        {role.tags.map(tag => (
          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-950 text-slate-500 rounded border border-slate-800">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800/50 relative z-10 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <ThumbsUp size={14} className={role.likes > 0 ? "text-amber-500" : ""} />
          <span className="font-medium text-slate-400">{role.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(role.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;