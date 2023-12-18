import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Comment } from "@/lib/db/schema/comments";

export default function CommentModal() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
      <Button
          variant={ "outline"}
          size={"sm" }
        >Comment          
        </Button> 
        <DialogContent>
          <DialogHeader className="px-5 pt-5">
            <DialogTitle>Comment</DialogTitle>
          </DialogHeader>
          <div className="px-5 pb-5">
            {/* <PostForm closeModal={closeModal} comment={comment} /> */}
          </div>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
}
