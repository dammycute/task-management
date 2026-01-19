import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-[5vh] md:top-[8vh] -translate-x-1/2 w-[94%] max-w-[400px] bg-[#111a22] border border-[#233648] rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[90vh] md:max-h-[84vh]"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-[#233648] shrink-0">
                            <h3 className="text-base font-bold text-white font-mono">{title}</h3>
                            <button
                                onClick={onClose}
                                className="text-[#92adc9] hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#233648]">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Modal;
