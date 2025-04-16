"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type RescheduleModalProps = {
  isOpen: boolean
  onClose: () => void
  session: {
    id: number
    subject: string
    tutee: string
    date: string
    time: string
  }
}

export function RescheduleModal({ isOpen, onClose, session }: RescheduleModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("14:00")
  const [endTime, setEndTime] = useState("15:00")
  const [reason, setReason] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would send the rescheduling data to the server
    console.log({
      sessionId: session.id,
      newDate: date,
      newStartTime: startTime,
      newEndTime: endTime,
      reason,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Subject</Label>
              <p className="font-medium">{session.subject}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Tutee</Label>
              <p className="font-medium">{session.tutee}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Current Date</Label>
              <p className="font-medium">{session.date}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Current Time</Label>
              <p className="font-medium">{session.time}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>New Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">New Start Time</Label>
              <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">New End Time</Label>
              <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Rescheduling (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Provide a reason for rescheduling"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-20"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Reschedule Session</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
