import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children, accentColor = '#eab308' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div
        className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-white backdrop-blur-xl"
        style={{
          boxShadow: `0 0 35px ${accentColor}33, 0 20px 40px rgba(0,0,0,0.8)`,
          borderColor: `${accentColor}55`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
