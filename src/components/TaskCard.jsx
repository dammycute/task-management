import React from 'react'
import { motion } from 'framer-motion'

const tagColors = {
  feature: 'bg-primary/10 text-primary',
  bug: 'bg-red-500/10 text-red-500',
  refactor: 'bg-purple-500/10 text-purple-500',
  devops: 'bg-emerald-500/10 text-emerald-500',
  backend: 'bg-amber-500/10 text-amber-500',
  frontend: 'bg-blue-500/10 text-blue-500',
  docs: 'bg-slate-500/10 text-slate-500'
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const tagClass = tagColors[task.tags[0].toLowerCase()] || 'bg-[#233648] text-[#92adc9]'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => onEdit(false)}
      className={`bg-[#192633] p-4 rounded-xl border border-transparent hover:border-primary/50 transition-all cursor-pointer active:cursor-grabbing shadow-sm hover:shadow-xl group ${task.finished ? 'opacity-75 grayscale-[0.3]' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`${tagClass} text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>
            {task.tags[0]}
          </span>
          {task.priority && (
            <span className={`text-[10px] font-bold uppercase ${task.priority === 'Critical' ? 'text-red-500' :
              task.priority === 'High' ? 'text-amber-500' :
                'text-[#4e6a85]'
              }`}>
              {task.priority}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(true); }}
            className="material-symbols-outlined text-[#4e6a85] text-lg hover:text-white transition-colors"
          >
            edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="material-symbols-outlined text-red-500/50 text-lg hover:text-red-500 transition-colors"
          >
            delete
          </button>
        </div>
      </div>

      <h4 className={`text-sm font-semibold mb-1 leading-snug ${task.finished ? 'line-through decoration-[#4e6a85] text-[#92adc9]' : 'text-white'}`}>
        {task.title}
      </h4>

      {task.description && (
        <p className="text-[12px] text-[#92adc9] mb-3 line-clamp-2 leading-relaxed font-mono opacity-80">
          {task.description}
        </p>
      )}

      {task.progress > 0 && (
        <div className="w-full bg-[#233648] h-1.5 rounded-full mb-4">
          <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${task.progress}%` }}></div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-[#92adc9]">
          <span className="material-symbols-outlined text-base">
            {task.finished ? 'done_all' : 'calendar_today'}
          </span>
          <span className="text-[11px] font-medium">
            {task.finished ? `Finished ${task.date || ''}` : (task.date || 'Today')}
          </span>
        </div>
        <div className="flex -space-x-2">
          <div
            className="size-6 rounded-full border-2 border-[#192633] bg-cover bg-center"
            style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}')` }}
            title={task.assignee}
          ></div>
        </div>
      </div>
    </motion.div>
  )
}
