import React from 'react'

export default function Header({ project, onAddTask }) {
  return (
    <header className="h-16 border-b border-[#233648] flex items-center justify-between px-6 bg-[#111a22]/50 backdrop-blur-md sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">{project?.icon || 'terminal'}</span>
          <h2 className="text-lg font-bold">{project?.name || 'Loading...'}</h2>
        </div>
        <div className="h-6 w-px bg-[#233648]"></div>
        <div className="flex items-center gap-4 text-sm font-medium text-[#92adc9]">
          <a className="text-white border-b-2 border-primary h-16 flex items-center px-2" href="#">Board view</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onAddTask}
          className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all font-mono"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          git commit
        </button>
      </div>
    </header>
  )
}
