import React from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import Column from './Column'

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default function Board({ columns, setColumns, filters, onAddTask, onEditTask, onDeleteTask, onAddColumn }) {
  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return
    const srcColId = source.droppableId
    const dstColId = destination.droppableId

    if (srcColId === dstColId) {
      const col = columns[srcColId]
      const newTasks = reorder(col.tasks, source.index, destination.index)
      setColumns(prev => ({ ...prev, [srcColId]: { ...col, tasks: newTasks } }))
    } else {
      const srcCol = columns[srcColId]
      const dstCol = columns[dstColId]
      const srcTasks = Array.from(srcCol.tasks)
      const [moved] = srcTasks.splice(source.index, 1)
      const dstTasks = Array.from(dstCol.tasks)
      dstTasks.splice(destination.index, 0, moved)
      setColumns(prev => ({ ...prev, [srcColId]: { ...srcCol, tasks: srcTasks }, [dstColId]: { ...dstCol, tasks: dstTasks } }))
    }
  }

  return (
    <div className="flex gap-6 items-start h-full pb-8">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(columns).map(col => (
          <Droppable droppableId={col.id} key={col.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column flex flex-col gap-4">
                <Column
                  column={col}
                  filters={filters}
                  onAddTask={() => onAddTask(col.id)}
                  onEditTask={(task, isEdit) => onEditTask(col.id, task, isEdit)}
                  onDeleteTask={(taskId) => onDeleteTask(col.id, taskId)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>

      {/* Add New Column Button */}
      <div className="kanban-column min-h-[120px]">
        <button
          onClick={onAddColumn}
          className="w-full h-12 flex items-center justify-center gap-2 bg-[#192633]/30 hover:bg-[#192633]/60 border border-dashed border-[#233648] rounded-xl text-[#92adc9] hover:text-white transition-all"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span className="text-sm font-medium">Add Section</span>
        </button>
      </div>
    </div>
  )
}
