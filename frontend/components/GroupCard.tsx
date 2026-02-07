import React from 'react';
import { Users, User, ThumbsUp, Calendar } from 'lucide-react';
import { Group } from '../types/albion';

const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const roleCount = Object.keys(group.roles).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col h-full">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/40 transition-all">
                <Users size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-100 leading-tight group-hover:text-amber-400 transition-colors">
                    {group.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                     <span className="uppercase text-[10px] border border-slate-700 px-1 rounded bg-slate-950">
                        {group.type}
                     </span>
                     <span>by {group.creator_name}</span>
                </div>
            </div>
        </div>
        <div className="text-right">
             <span className="text-xs text-slate-500">Size</span>
             <div className="font-mono text-xl font-bold text-indigo-400">{roleCount}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
        {group.description}
      </p>

      {/* Tags */}
       <div className="flex flex-wrap gap-1 mb-4">
        {group.tags.map(tag => (
          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-950 text-slate-500 rounded border border-slate-800">
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/50 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <ThumbsUp size={14} className={group.likes > 0 ? "text-amber-500" : ""} />
          <span className="font-medium text-slate-400">{group.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{new Date(group.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;