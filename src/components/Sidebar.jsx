import React from 'react';

const Sidebar = ({ projects, activeId, onSwitch, onCreateProject, onDeleteProject }) => {
    return (
        <aside className="w-64 flex-shrink-0 border-r border-[#233648] bg-[#111a22] flex flex-col justify-between p-4 hidden md:flex shrink-0">
            <div className="flex flex-col gap-8 h-full">
                <div className="flex items-center gap-3 px-2">
                    <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-2xl">code</span>
                    </div>
                    <div>
                        <h1 className="text-white text-base font-bold leading-tight">DevBoard</h1>
                        <p className="text-[#92adc9] text-[10px] font-mono uppercase tracking-tighter">Local Instance v1.0</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6 flex-1 overflow-hidden">
                    <div>
                        <p className="px-3 text-[10px] font-bold text-[#4e6a85] uppercase tracking-[0.1em] mb-3">Your Repositories</p>
                        <div className="flex flex-col gap-1 overflow-y-auto max-h-[40vh] scrollbar-hide">
                            {projects.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => onSwitch(p.id)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all group ${activeId === p.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-[#92adc9] hover:bg-[#233648] hover:text-white'}`}
                                >
                                    <div className="flex items-center gap-3 truncate">
                                        <span className="material-symbols-outlined text-[20px] shrink-0">{p.icon || 'terminal'}</span>
                                        <span className="text-sm font-medium truncate">{p.name}</span>
                                    </div>
                                    {projects.length > 1 && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeleteProject(p.id); }}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-500/10 rounded"
                                        >
                                            <span className="material-symbols-outlined text-sm text-red-400">close</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={onCreateProject}
                            className="w-full bg-[#192633] border border-[#233648] hover:border-primary/50 text-[#92adc9] hover:text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-mono"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            new-repository
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center gap-3 px-2 py-3 bg-[#0b1016]/50 rounded-xl border border-[#233648]">
                    <div className="size-9 rounded-full bg-cover bg-center border border-primary/30" style={{ backgroundImage: "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Alex')" }}></div>
                    <div className="flex flex-col">
                        <p className="text-white text-xs font-bold leading-none mb-1">Alex Rivera</p>
                        <div className="flex items-center gap-1.5">
                            <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[#92adc9] text-[10px] uppercase font-mono tracking-tighter">sudo: enabled</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
