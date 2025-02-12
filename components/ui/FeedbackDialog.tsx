"use client";
import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { submitFeedbackThunk } from "@/slices/FeedbackSlice";

export default function FeedbackDialog({
  feedbackType,
}: {
  feedbackType: "hint" | "chat";
}) {
  const [feedback, setFeedback] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(
        submitFeedbackThunk({ feedbackText: feedback, feedbackType })
      ).unwrap();
      // Optionally, you can display a success notification here.
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally, add error handling such as displaying a toast notification.
    }

    // Reset the feedback form after submission
    setFeedback("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          Click to provide feedback on Codey&apos;s response
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Feedback</DialogTitle>
          <DialogDescription>
            Please share your feedback about Codey&apos;s performance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded-md"
            rows={4}
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <DialogFooter className="mt-4">
            <Button type="submit">Submit</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
