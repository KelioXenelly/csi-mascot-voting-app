"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className={cn(
        "relative w-full bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col",
        maxWidth,
        "max-h-[90vh]"
      )}>
        <div className="p-8 pb-4 flex items-center justify-between border-b border-white/20 shrink-0">
          <h2 className="text-2xl font-black tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 pt-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
