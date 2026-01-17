import React from 'react'

export default function Footer() {
    return (
        <footer className="h-12 border-t border-[#233648] bg-[#111a22] flex items-center justify-between px-8 text-[#92adc9] text-[11px] font-medium shrink-0">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="size-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></span>
                    <span>Connected to alpha-cluster-01</span>
                </div>
                <div className="h-3 w-[1px] bg-[#233648]"></div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">sync</span>
                    <span>All changes synced</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="hover:text-white cursor-pointer flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">history</span>
                    View Activity History
                </span>
                <span className="hover:text-white cursor-pointer transition-colors">Keyboard Shortcuts</span>
            </div>
        </footer>
    )
}
