"use client"

import React from "react"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { CalendarSyncModal } from "./calendar-sync-modal"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
]

type AvailabilityState = {
  [key: string]: {
    [key: string]: boolean
  }
}

export function AvailabilityGrid() {
  const [availability, setAvailability] = useState<AvailabilityState>(() => {
    const initialState: AvailabilityState = {}
    days.forEach((day) => {
      initialState[day] = {}
      timeSlots.forEach((time) => {
        initialState[day][time] = false
      })
    })
    return initialState
  })
  const [isCalendarSyncModalOpen, setIsCalendarSyncModalOpen] = useState(false)

  const toggleTimeSlot = (day: string, time: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day][time],
      },
    }))
  }

  const toggleDay = (day: string) => {
    const allSelected = Object.values(availability[day]).every(Boolean)
    const newValue = !allSelected

    setAvailability((prev) => {
      const updatedDay = { ...prev[day] }
      timeSlots.forEach((time) => {
        updatedDay[time] = newValue
      })

      return {
        ...prev,
        [day]: updatedDay,
      }
    })
  }

  const toggleTimeColumn = (time: string) => {
    const allSelected = days.every((day) => availability[day][time])
    const newValue = !allSelected

    setAvailability((prev) => {
      const updated = { ...prev }
      days.forEach((day) => {
        updated[day] = {
          ...updated[day],
          [time]: newValue,
        }
      })
      return updated
    })
  }

  const handleSaveAvailability = () => {
    // In a real app, this would save the availability to the server
    console.log("Saving availability:", availability)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Toggle time slots to set your weekly availability</p>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsCalendarSyncModalOpen(true)}
        >
          <CalendarDays className="h-4 w-4" />
          <span>Sync Calendar</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[150px_repeat(13,minmax(80px,1fr))]">
            {/* Header row with time slots */}
            <div className="flex items-end justify-center p-2 font-medium">
              <span className="sr-only">Days / Times</span>
            </div>

            {timeSlots?.map((time) => (
              <div key={time} className="p-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium">{time}</span>
                  <Switch
                    checked={days.every((day) => availability[day][time])}
                    onCheckedChange={() => toggleTimeColumn(time)}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}

            {/* Day rows */}
            {days?.map((day) => (
              <React.Fragment key={day}>
                <div className="flex items-center p-2 font-medium border-t">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={Object.values(availability[day]).every(Boolean)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <Label className="cursor-pointer" onClick={() => toggleDay(day)}>
                      {day}
                    </Label>
                  </div>
                </div>

                {timeSlots?.map((time) => (
                  <div key={`${day}-${time}`} className="p-2 text-center border-t">
                    <Switch checked={availability[day][time]} onCheckedChange={() => toggleTimeSlot(day, time)} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSaveAvailability}>Save Availability</Button>
      </div>

      <CalendarSyncModal isOpen={isCalendarSyncModalOpen} onClose={() => setIsCalendarSyncModalOpen(false)} />
    </div>
  )
}
