"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Plus, Video, X, Check } from "lucide-react"
import { AvailabilityGrid } from "./availability-grid"
import { SessionReportModal } from "./session-report-modal"
import { BookSessionModal } from "./book-session-modal"
import { RescheduleModal } from "./reschedule-modal"

// Mock data for demonstration
const todaySessions = [
  {
    id: 1,
    subject: "Physics Mechanics",
    tutee: "Alex Johnson",
    time: "2:00 PM - 3:30 PM",
    image: "/placeholder.svg?height=40&width=40",
    status: "upcoming",
  },
  {
    id: 2,
    subject: "Chemistry Basics",
    tutee: "Sarah Williams",
    time: "4:00 PM - 5:00 PM",
    image: "/placeholder.svg?height=40&width=40",
    status: "upcoming",
  },
]

const upcomingSessions = [
  {
    id: 3,
    subject: "Advanced Calculus",
    tutee: "Michael Brown",
    date: "Oct 12",
    time: "4:00 PM - 5:30 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    subject: "English Literature",
    tutee: "Emily Davis",
    date: "Oct 14",
    time: "3:00 PM - 4:00 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const allUpcomingSessions = [
  ...upcomingSessions,
  {
    id: 5,
    subject: "Physics Mechanics",
    tutee: "James Wilson",
    date: "Oct 16",
    time: "5:00 PM - 6:30 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const pastSessions = [
  {
    id: 6,
    subject: "Chemistry Basics",
    tutee: "Olivia Martinez",
    date: "Oct 5",
    time: "2:00 PM - 3:30 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    subject: "Algebra Review",
    tutee: "Daniel Thompson",
    date: "Oct 7",
    time: "4:00 PM - 5:00 PM",
    image: "/placeholder.svg?height=40&width=40",
  },
]

const pendingBookings = [
  {
    id: 8,
    subject: "Biology Introduction",
    tutee: "Sophia Anderson",
    date: "Oct 18",
    time: "1:00 PM - 2:00 PM",
    image: "/placeholder.svg?height=40&width=40",
    status: "pending",
  },
]

const canceledSessions = [
  {
    id: 9,
    subject: "Spanish Conversation",
    tutee: "William Taylor",
    date: "Oct 2",
    time: "1:00 PM - 2:00 PM",
    image: "/placeholder.svg?height=40&width=40",
    reason: "Tutee unavailable",
  },
]

export function SessionManagement() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [calendarView, setCalendarView] = useState("month")
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  const handleOpenReportModal = (session: any) => {
    setSelectedSession(session)
    setIsReportModalOpen(true)
  }

  const handleOpenRescheduleModal = (session: any) => {
    setSelectedSession(session)
    setIsRescheduleModalOpen(true)
  }

  const handleJoinSession = (sessionId: number) => {
    // In a real app, this would navigate to the video conference URL
    console.log(`Joining session ${sessionId}`)
    window.open("https://example.com/video-session/" + sessionId, "_blank")
  }

  const handleAcceptBooking = (sessionId: number) => {
    console.log(`Accepting booking ${sessionId}`)
    // In a real app, this would update the booking status in the database
  }

  const handleRejectBooking = (sessionId: number) => {
    console.log(`Rejecting booking ${sessionId}`)
    // In a real app, this would update the booking status in the database
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Session Management</h1>
        <Button onClick={() => setIsBookModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Select value={calendarView} onValueChange={setCalendarView}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Sessions</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaySessions.length > 0 ? (
                todaySessions.map((session) => (
                  <div key={session.id} className="flex items-start space-x-4 rounded-md border p-3">
                    <img
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutee}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">with {session.tutee}</p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{session.time}</span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleJoinSession(session.id)}>
                      <Video className="mr-1 h-3 w-3" />
                      Join
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No sessions scheduled for today</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Bookings</CardTitle>
              <CardDescription>Requires your confirmation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingBookings.length > 0 ? (
                pendingBookings.map((session) => (
                  <div key={session.id} className="flex items-start space-x-4 rounded-md border p-3">
                    <img
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutee}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">with {session.tutee}</p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {session.date}, {session.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleRejectBooking(session.id)}
                      >
                        <X className="mr-1 h-3 w-3" />
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => handleAcceptBooking(session.id)}>
                        <Check className="mr-1 h-3 w-3" />
                        Accept
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No pending bookings</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-start space-x-4 rounded-md border p-3">
                    <img
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutee}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">with {session.tutee}</p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {session.date}, {session.time}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleOpenRescheduleModal(session)}>
                      Reschedule
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No upcoming sessions</p>
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

      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allUpcomingSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{session.subject}</CardTitle>
                  <CardDescription>with {session.tutee}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <img
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutee}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{session.date}</p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleOpenRescheduleModal(session)}
                    >
                      Reschedule
                    </Button>
                    <Button size="sm" className="w-full" onClick={() => handleJoinSession(session.id)}>
                      <Video className="mr-1 h-3 w-3" />
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{session.subject}</CardTitle>
                  <CardDescription>with {session.tutee}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <img
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutee}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{session.date}</p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleOpenReportModal(session)}
                    >
                      Add Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setIsBookModalOpen(true)}>
                      Book Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="canceled" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {canceledSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{session.subject}</CardTitle>
                    <div className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                      Canceled
                    </div>
                  </div>
                  <CardDescription>with {session.tutee}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <img
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutee}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{session.date}</p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Reason: {session.reason}</p>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setIsBookModalOpen(true)}>
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedSession && (
        <SessionReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          session={selectedSession}
        />
      )}

      <BookSessionModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />

      {selectedSession && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          session={selectedSession}
        />
      )}
    </div>
  )
}
