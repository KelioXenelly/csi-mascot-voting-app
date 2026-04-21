"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mascot } from "@/app/protected/types/mascot";
import { Trash2, Edit3, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Modal } from "./ui/modal";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function AdminMascotList({ mascots }: { mascots: Mascot[] }) {
  const supabase = createClient();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingMascot, setEditingMascot] = useState<Mascot | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    if (!isDeleting) return;
    
    setDeletingId(isDeleting);
    try {
      const { error } = await supabase.from("mascots").delete().eq("id", isDeleting);
      if (error) throw error;
      
      setIsDeleting(null);
      router.refresh();
      toast.success("Entry Removed", {
        description: "The mascot entry and its votes have been permanently cleared."
      });
      setDeletingId(null);
    } catch (err) {
      alert("Failed to delete mascot");
      setDeletingId(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingMascot) return;

    setIsUpdating(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;
    const pdf_url = formData.get("pdf_url") as string;

    try {
      const { error } = await supabase
        .from("mascots")
        .update({ name, description, image_url, pdf_url: pdf_url || null })
        .eq("id", editingMascot.id);

      if (error) throw error;
      
      setEditingMascot(null);
      router.refresh();
      toast.success("Update Successful", {
        description: `Changes to ${name} have been saved and are now live.`
      });
      setIsUpdating(false);
    } catch (err) {
      alert("Failed to update mascot");
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-xl overflow-hidden">
      <div className="p-8 border-b border-white/20">
        <h2 className="text-2xl font-black tracking-tight">Manage Entries</h2>
        <p className="text-sm text-muted-foreground font-medium">Edit or remove competition candidates</p>
      </div>
      
      <div className="divide-y divide-white/20">
        {mascots.map((m) => (
          <div key={m.id} className="p-6 flex items-center justify-between hover:bg-white/30 transition-colors group">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-white/50">
                <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-black text-xl">{m.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1 max-w-sm">
                  {m.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pr-2">
              <button 
                onClick={() => setEditingMascot(m)}
                className="p-3 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              >
                <Edit3 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsDeleting(m.id)}
                className="p-3 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        
        {mascots.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <p className="font-bold">No mascots found.</p>
            <p className="text-sm">Start by adding a new hero to the system.</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={!!editingMascot} 
        onClose={() => setEditingMascot(null)} 
        title="Edit Entry Details"
      >
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Candidate Name</Label>
              <Input
                name="name"
                defaultValue={editingMascot?.name}
                required
                className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Image URL</Label>
              <Input
                name="image_url"
                defaultValue={editingMascot?.image_url}
                required
                className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Concept PDF URL</Label>
              <Input
                name="pdf_url"
                defaultValue={editingMascot?.pdf_url}
                className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Description</Label>
              <Textarea
                name="description"
                defaultValue={editingMascot?.description}
                required
                className="bg-white/50 border-foreground/5 min-h-[100px] p-4 rounded-xl"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold"
          >
            {isUpdating ? <Loader2 className="animate-spin" /> : "Save Changes"}
          </Button>
        </form>
      </Modal>

      {/* ⚠️ DELETE CONFIRMATION MODAL */}
      <Modal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        title="Remove Entry?"
      >
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">Are you absolutely sure?</p>
            <p className="text-sm text-muted-foreground px-4">
              This action will permanently delete this mascot and <span className="text-red-500 font-bold uppercase">all associated votes</span>. This cannot be undone.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleDelete}
              disabled={!!deletingId}
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
            >
              {deletingId ? <Loader2 className="animate-spin" /> : "Yes, Delete It"}
            </Button>
            <Button
              onClick={() => setIsDeleting(null)}
              variant="ghost"
              className="w-full h-14 bg-transparent border border-foreground/10 text-muted-foreground font-bold rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
