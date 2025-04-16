"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChromeIcon as Google, CalendarDays } from "lucide-react"

type CalendarSyncModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function CalendarSyncModal({ isOpen, onClose }: CalendarSyncModalProps) {
  const [calendarType, setCalendarType] = useState("google")
  const [syncDirection, setSyncDirection] = useState("both")

  const handleSync = () => {
    // In a real app, this would initiate the calendar sync process
    console.log({
      calendarType,
      syncDirection,
    })

    // Simulate successful sync
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Sync Calendar</DialogTitle>
          <DialogDescription>Connect your external calendar to keep your schedule in sync</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Calendar Service</Label>
            <RadioGroup value={calendarType} onValueChange={setCalendarType} className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="google" id="google" />
                <Label htmlFor="google" className="flex items-center cursor-pointer">
                  <Google className="h-5 w-5 mr-2 text-red-500" />
                  Google Calendar
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="outlook" id="outlook" />
                <Label htmlFor="outlook" className="flex items-center cursor-pointer">
                  <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
                  Outlook Calendar
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Sync Direction</Label>
            <RadioGroup value={syncDirection} onValueChange={setSyncDirection}>
              <div className="flex items-center space-x-2 rounded-md border p-3 mb-2 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="import" id="import" />
                <Label htmlFor="import" className="cursor-pointer">
                  Import events to tutoring platform
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 mb-2 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="export" id="export" />
                <Label htmlFor="export" className="cursor-pointer">
                  Export tutoring sessions to calendar
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="cursor-pointer">
                  Two-way sync (recommended)
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSync}>Connect Calendar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
