"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Video /*, X, Check*/ } from "lucide-react"
import { AvailabilityGrid } from "./availability-grid"
import { SessionReportModal } from "./session-report-modal"
import { BookSessionModal } from "./book-session-modal"
import { RescheduleModal } from "./reschedule-modal"
import { useRouter } from "next/navigation"

export function SessionManagement() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [demoBookings, setDemoBookings] = useState<any[]>([])
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  const router = useRouter();

  const tutor = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : null
  const tutorId = tutor?._id

  // Fetch all demo-class bookings whenever tutorId changes
  useEffect(() => {
    if (!tutorId) return
    fetch(`http://localhost:8000/tutor-api/demo-class/${tutorId}`)
      .then(res => res.json())
      .then(data => {
        // assume data.payload is the array of bookings
        setDemoBookings(data.payload || [])
      })
      .catch(console.error)
  }, [tutorId])

  // filter bookings by selected date (year-month-day)
  const selectedDateKey = date?.toISOString().slice(0,10)
  const todaysBookings = demoBookings.filter(b => 
    b.createdAt.slice(0,10) === selectedDateKey
  )

  const handleOpenReportModal = (session: any) => {
    setSelectedSession(session)
    setIsReportModalOpen(true)
  }
  const handleOpenRescheduleModal = (session: any) => {
    setSelectedSession(session)
    setIsRescheduleModalOpen(true)
  }
  const handleJoinSession = (link: string) => {
    window.open(link, "_blank")
  }

  // const handleAcceptBooking = (id: string) => { /* ... */ }
  // const handleRejectBooking = (id: string) => { /* ... */ }

  return (
    <div className="space-y-8">
      {/* <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Session Management</h1>
        <Button onClick={() => setIsBookModalOpen(true)}>
          Book Session
        </Button>
      </div> */}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <div className="col-span-1 space-y-8">
          {/* Today's Demo-Class Bookings */}
          <Card onClick={()=>{router.push("/tutor/notifications")}} className="hover:cursor-pointer">
            <CardHeader>
              <CardTitle>Bookings on {date?.toLocaleDateString()}</CardTitle>
              <CardDescription>Filtered by selected date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysBookings.length > 0 ? (
                todaysBookings.map((b) => (
                  <div key={b._id} className="flex items-start space-x-4 rounded-md border p-3">
                    <img
                      src={b.tuteeId.profileImage || "/placeholder.svg"}
                      alt={`${b.tuteeId.firstName} ${b.tuteeId.lastName}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{b.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        with {b.tuteeId.firstName} {b.tuteeId.lastName}
                      </p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(b.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    {b.status === "pending" && (
                      <div className="flex flex-col gap-2">
                        {/* 
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleRejectBooking(b._id)}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Reject
                        </Button>
                        <Button size="sm" onClick={() => handleAcceptBooking(b._id)}>
                          <Check className="mr-1 h-3 w-3" />
                          Accept
                        </Button>
                        */}
                      </div>
                    )}
                    {b.status === "accepted" && (
                      <Button size="sm" onClick={() => handleJoinSession(b.meetLink)}>
                        <Video className="mr-1 h-3 w-3" />
                        Join
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No bookings for this date</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Weekly Availability</CardTitle>
          <CardDescription>Set your available time slots for bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <AvailabilityGrid />
        </CardContent>
      </Card>
{/* 
      <SessionReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        session={selectedSession}
      /> */}
      <BookSessionModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
      {/* <RescheduleModal
        isOpen={isRescheduleModalOpen}
        onClose={() => setIsRescheduleModalOpen(false)}
        session={selectedSession}
      /> */}
    </div>
  )
}
