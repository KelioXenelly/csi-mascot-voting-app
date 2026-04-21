"use client";

import { useState } from "react";
import { Mascot } from "@/app/protected/types/mascot";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { AlertCircle, FileText, Send, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface MascotPreviewModalProps {
  mascot: Mascot | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mascotId: string) => Promise<void>;
  isSubmitting: boolean;
}

export function MascotPreviewModal({
  mascot,
  isOpen,
  onClose,
  onConfirm,
  isSubmitting,
}: MascotPreviewModalProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!mascot) return null;

  const handleVote = async () => {
    if (!isConfirmed) return;
    await onConfirm(mascot.id);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Design Preview & Confirmation" 
      maxWidth="max-w-6xl"
    >
      <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
        {/* 📄 PDF / Concept Section */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-600/10 text-blue-600 rounded-lg">
                <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Concept Document</h3>
          </div>
          
          <div className="relative w-full h-[350px] lg:h-[600px] bg-muted/20 rounded-[2rem] border-2 border-dashed border-foreground/5 overflow-hidden group">
            {mascot.pdf_url ? (
              <iframe
                src={`${mascot.pdf_url}#toolbar=0`}
                className="w-full h-full rounded-[2rem]"
                title="Mascot Concept PDF"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-4">
                <div className="w-20 h-20 bg-blue-600/5 rounded-full flex items-center justify-center text-blue-600/20">
                    <FileText className="w-10 h-10" />
                </div>
                <div>
                  <p className="font-black text-xl text-foreground/40 italic">Document Not Available</p>
                  <p className="text-sm text-muted-foreground max-w-[200px] mx-auto mt-2 font-medium">
                    This candidate hasn't uploaded a concept document yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🗳️ Details & Confirmation Section */}
        <div className="w-full lg:w-[400px] flex flex-col space-y-8">
          <div className="space-y-6">
            <div className="aspect-square w-40 h-40 mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={mascot.image_url} 
                  alt={mascot.name} 
                  className="w-full h-full object-cover"
                />
            </div>
            
            <div className="text-center lg:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-1">
                   <Star className="w-3 h-3 fill-blue-600" /> Mascot Entry
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-foreground">{mascot.name}</h2>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  {mascot.description}
                </p>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-foreground/5">
            {/* ⚠️ Warning Reminder */}
            <div className="bg-amber-50 border border-amber-200/50 p-6 rounded-[2rem] flex gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                    <p className="font-black text-amber-900 text-sm leading-tight">Wait! Are you sure?</p>
                    <p className="text-[11px] text-amber-700 font-bold leading-relaxed">
                        Jangan tekan vote sebelum bener-benar yakin. Pilihan Anda adalah final dan tidak dapat diubah setelah dikirimkan.
                    </p>
                </div>
            </div>

            {/* ✅ Confirmation Checkbox */}
            <div 
              className={cn(
                "p-6 rounded-[2rem] border-2 transition-all cursor-pointer select-none flex items-start gap-4",
                isConfirmed 
                  ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20" 
                  : "bg-white/50 border-foreground/5 text-muted-foreground hover:border-blue-600/30"
              )}
              onClick={() => setIsConfirmed(!isConfirmed)}
            >
              <div className={cn(
                "mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0",
                isConfirmed ? "bg-white border-white text-blue-600" : "border-foreground/20"
              )}>
                {isConfirmed && <Send className="w-3.5 h-3.5" />}
              </div>
              <p className="text-sm font-black leading-tight">
                Saya yakin ingin vote mascot <span className={cn(isConfirmed ? "text-white" : "text-blue-600")}>{mascot.name}</span> ini.
              </p>
            </div>

            {/* 🚀 Submit Button */}
            <Button
              onClick={handleVote}
              disabled={!isConfirmed || isSubmitting}
              className={cn(
                "w-full h-20 rounded-[2rem] font-black text-xl transition-all relative overflow-hidden group",
                isConfirmed 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95" 
                  : "bg-muted text-muted-foreground cursor-not-allowed grayscale"
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent animate-spin rounded-full" />
                  <span>Recording...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span>Cast Final Vote</span>
                  <Send className={cn(
                    "w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1",
                    !isConfirmed && "opacity-20"
                  )} />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
