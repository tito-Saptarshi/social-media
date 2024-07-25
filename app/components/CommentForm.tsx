import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dice1 } from "lucide-react";
import { SubmitButton } from "./SubmitButtons";

export function CommentForm() {
  return (
    <form className="mt-5">
      <Label>Comment right here</Label>
      <Textarea
        placeholder="What are your thoughts?"
        className="w-full mt-1 mb-2"
        name="comment"
      />
       <SubmitButton text="Comment" />
    </form>
  );
}
