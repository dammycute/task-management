import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

export default function Column({ column, filters, onAddTask, onEditTask, onDeleteTask }) {
  const filtered = column.tasks.filter(t => {
    if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.assignee !== 'all' && t.assignee !== filters.assignee) return false
    if (filters.tag !== 'all' && !t.tags.includes(filters.tag)) return false
    if (filters.priority !== 'all' && t.priority !== filters.priority) return false
    return true
  })

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">{column.title}</h3>
          <span className={`${column.id === 'inprogress' ? 'bg-primary' : 'bg-[#233648]'} text-white text-[11px] font-bold px-2 py-0.5 rounded-full`}>
            {filtered.length}
          </span>
        </div>
        <button className="text-[#92adc9] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 min-h-[100px]">
        {filtered.map((task, idx) => (
          <Draggable key={task.id} draggableId={task.id} index={idx}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <TaskCard
                  task={task}
                  onEdit={(isEdit) => onEditTask(task, isEdit)}
                  onDelete={() => onDeleteTask(task.id)}
                />
              </div>
            )}
          </Draggable>
        ))}

        <button
          onClick={onAddTask}
          className="w-full py-3 border-2 border-dashed border-[#233648] rounded-xl text-[#92adc9] text-sm font-medium hover:border-primary/30 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Task
        </button>
      </div>
    </div>
  )
}
