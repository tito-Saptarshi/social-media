"use client";

import { useToast } from "@/components/ui/use-toast";
import { Share } from "lucide-react";

export function CopyLink({ id }: { id: string }) {
  const { toast } = useToast();
  async function copytoClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`); // location.origin --> currently it's localhost3000
    toast({
      title: "Success",
      description: "Your link is copied in your clipboard",
    });
  }
  // js api OR navigator api (should be marked async)
  //   on click --> event handler, component should be marked client

  return (
    <button className="flex items-center gap-x-1" onClick={copytoClipboard}>
      <Share className="h-4 w-4 text-muted-foreground" />
      <p className="text-muted-foreground font-medium text-xs">Share</p>
    </button>
  );
}
