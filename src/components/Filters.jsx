import React from 'react'

export default function Filters({ filters, setFilters }) {
  const hasFilters = filters.search || filters.assignee !== 'all' || filters.tag !== 'all' || filters.priority !== 'all'

  return (
    <div className="flex items-center gap-3 p-4 px-4 md:px-6 overflow-x-auto border-b border-[#233648] bg-[#111a22]/30 shrink-0">
      <div className="relative group shrink-0">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-primary text-lg">search</span>
        </div>
        <input
          className="bg-[#0b1016] border border-[#233648] text-xs rounded-lg pl-9 pr-4 py-2 w-56 focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#4e6a85] text-white font-mono"
          placeholder="grep tasks..."
          type="text"
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
        />
      </div>

      <div className="h-4 w-px bg-[#233648] mx-1"></div>

      <div className="relative">
        <select
          className="appearance-none bg-[#192633] border border-[#233648] text-[11px] font-bold uppercase tracking-wider rounded-lg pl-3 pr-8 py-2 focus:ring-1 focus:ring-primary text-[#92adc9] hover:text-white transition-colors cursor-pointer"
          value={filters.priority}
          onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}
        >
          <option value="all">Priority: All</option>
          <option value="Low">Priority: Low</option>
          <option value="Medium">Priority: Medium</option>
          <option value="High">Priority: High</option>
          <option value="Critical">Priority: Critical</option>
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-base pointer-events-none text-[#92adc9]">expand_more</span>
      </div>

      <div className="relative">
        <select
          className="appearance-none bg-[#192633] border border-[#233648] text-[11px] font-bold uppercase tracking-wider rounded-lg pl-3 pr-8 py-2 focus:ring-1 focus:ring-primary text-[#92adc9] hover:text-white transition-colors cursor-pointer"
          value={filters.tag}
          onChange={e => setFilters(f => ({ ...f, tag: e.target.value }))}
        >
          <option value="all">Type: All</option>
          <option value="Feature">Feature</option>
          <option value="Bug">Bug</option>
          <option value="Refactor">Refactor</option>
          <option value="DevOps">DevOps</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-base pointer-events-none text-[#92adc9]">expand_more</span>
      </div>

      <div className="relative">
        <select
          className="appearance-none bg-[#192633] border border-[#233648] text-[11px] font-bold uppercase tracking-wider rounded-lg pl-3 pr-8 py-2 focus:ring-1 focus:ring-primary text-[#92adc9] hover:text-white transition-colors cursor-pointer"
          value={filters.assignee}
          onChange={e => setFilters(f => ({ ...f, assignee: e.target.value }))}
        >
          <option value="all">Owner: All</option>
          <option value="Alex">Alex Rivera</option>
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-base pointer-events-none text-[#92adc9]">expand_more</span>
      </div>

      {hasFilters && (
        <button
          onClick={() => setFilters({ search: '', assignee: 'all', tag: 'all', priority: 'all' })}
          className="flex items-center gap-2 bg-red-500/10 px-3 py-2 rounded-lg text-[11px] font-bold uppercase text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20"
        >
          <span className="material-symbols-outlined text-sm">filter_alt_off</span>
          Clear
        </button>
      )}
    </div>
  )
}
