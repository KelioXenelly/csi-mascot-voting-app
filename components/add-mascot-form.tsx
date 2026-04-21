"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { PlusCircle, Image as ImageIcon, Type, AlignLeft, FileText } from "lucide-react";
import { toast } from "sonner";

export function AddMascotForm() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;
    const pdf_url = formData.get("pdf_url") as string;

    try {
      const { error } = await supabase.from("mascots").insert({
        name,
        description,
        image_url,
        pdf_url: pdf_url || null,
      });

      if (error) throw error;
      
      router.refresh();
      (e.target as HTMLFormElement).reset();
      toast.success("Mascot Registered!", {
        description: `${name} has been added to the competition successfully.`
      });
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to add mascot");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
          <PlusCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">Register New Entry</h2>
          <p className="text-sm text-muted-foreground font-medium">Add a candidate to the competition</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <Type className="w-3 h-3" /> Candidate Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. CSI Lion"
              required
              className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image_url" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <ImageIcon className="w-3 h-3" /> Image URL
            </Label>
            <Input
              id="image_url"
              name="image_url"
              placeholder="https://example.com/mascot.png"
              required
              className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pdf_url" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <FileText className="w-3 h-3" /> Concept PDF URL
            </Label>
            <Input
              id="pdf_url"
              name="pdf_url"
              placeholder="https://example.com/concept.pdf"
              className="bg-white/50 border-foreground/5 h-12 px-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <AlignLeft className="w-3 h-3" /> Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us about this amazing mascot..."
              required
              className="bg-white/50 border-foreground/5 min-h-[120px] p-4 rounded-xl focus-visible:ring-blue-600/20 focus-visible:border-blue-600 transition-all resize-none"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20 font-medium">
            ⚠️ {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 active:scale-95 transition-all rounded-2xl font-black text-lg shadow-lg shadow-blue-500/25"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-3 border-white border-t-transparent animate-spin rounded-full" />
              <span>Registering Entry...</span>
            </div>
          ) : (
            "Create Candidate Entry"
          )}
        </Button>
      </form>
    </div>
  );
}
