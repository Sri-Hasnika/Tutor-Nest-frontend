// components/tutor/session-report-modal.tsx

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"

type SessionReportModalProps = {
  isOpen: boolean
  onClose: () => void
  session: {
    id: number
    tuteeName: string
    subject: string
    date: string
    time: string
  }
}

export function SessionReportModal({ isOpen, onClose, session }: SessionReportModalProps) {
  const [rating, setRating] = useState(0)
  const [summary, setSummary] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle submit logic
    console.log({
      sessionId: session.id,
      rating,
      summary,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Session Report</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Tutee</Label>
              <p className="font-medium">{session?.tuteeName}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Subject</Label>
              <p className="font-medium">{session?.subject}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Date</Label>
              <p className="font-medium">{formatDate(session?.date)}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Time</Label>
              <p className="font-medium">{session?.time}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Session Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what was covered in the session, progress made, and areas for improvement..."
              className="h-32"
            />
          </div>

          <div className="space-y-2">
            <Label>Session Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Report</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
