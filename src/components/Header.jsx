import React from 'react'

export default function Header({ project, onAddTask, onMenuClick }) {
  return (
    <header className="h-16 border-b border-[#233648] flex items-center justify-between px-4 md:px-6 bg-[#111a22]/50 backdrop-blur-md sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-[#92adc9] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-2 md:gap-3">
          <span className="material-symbols-outlined text-primary text-xl md:text-2xl">{project?.icon || 'terminal'}</span>
          <h2 className="text-sm md:text-lg font-bold truncate max-w-[150px] md:max-w-none">{project?.name || 'Loading...'}</h2>
        </div>
        <div className="hidden sm:block h-6 w-px bg-[#233648]"></div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-[#92adc9]">
          <a className="text-white border-b-2 border-primary h-16 flex items-center px-2" href="#">Board view</a>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onAddTask}
          className="bg-primary text-white text-[12px] md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all font-mono"
        >
          <span className="material-symbols-outlined text-base md:text-lg">add</span>
          <span className="hidden xs:inline">git commit</span>
          <span className="xs:hidden">commit</span>
        </button>
      </div>
    </header>
  )
}
