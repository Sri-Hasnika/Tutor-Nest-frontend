"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingCard } from "@/components/tutor/booking-card"
import { SessionReportModal } from "@/components/tutor/session-report-modal"

// Mock data for demonstration
const upcomingSessions = [
  {
    id: 1,
    tuteeName: "Alex Johnson",
    subject: "Mathematics",
    date: "2025-04-15",
    time: "15:00-16:00",
    status: "Confirmed",
  },
  {
    id: 2,
    tuteeName: "Sarah Williams",
    subject: "Physics",
    date: "2025-04-16",
    time: "10:00-11:30",
    status: "Confirmed",
  },
  {
    id: 3,
    tuteeName: "Michael Brown",
    subject: "Chemistry",
    date: "2025-04-18",
    time: "14:00-15:00",
    status: "Confirmed",
  },
]

const pastSessions = [
  {
    id: 4,
    tuteeName: "Emily Davis",
    subject: "Mathematics",
    date: "2025-04-10",
    time: "16:00-17:00",
    status: "Completed",
  },
  {
    id: 5,
    tuteeName: "James Wilson",
    subject: "Computer Science",
    date: "2025-04-08",
    time: "11:00-12:30",
    status: "Completed",
  },
  {
    id: 6,
    tuteeName: "Olivia Martinez",
    subject: "English",
    date: "2025-04-05",
    time: "09:00-10:00",
    status: "Completed",
  },
]

const pendingBookings = [
  {
    id: 7,
    tuteeName: "Daniel Thompson",
    subject: "Physics",
    date: "2025-04-20",
    time: "13:00-14:00",
    status: "Pending",
  },
  {
    id: 8,
    tuteeName: "Sophia Anderson",
    subject: "Biology",
    date: "2025-04-22",
    time: "17:00-18:00",
    status: "Pending",
  },
]

export function SessionTabs() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)

  const handleOpenReportModal = (session: any) => {
    setSelectedSession(session)
    setIsReportModalOpen(true)
  }

  return (
    <>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => <BookingCard key={session.id} session={session} type="upcoming" />)
          ) : (
            <p className="text-center py-8 text-muted-foreground">No upcoming sessions</p>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastSessions.length > 0 ? (
            pastSessions.map((session) => (
              <BookingCard
                key={session.id}
                session={session}
                type="past"
                onAddReport={() => handleOpenReportModal(session)}
              />
            ))
          ) : (
            <p className="text-center py-8 text-muted-foreground">No past sessions</p>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingBookings.length > 0 ? (
            pendingBookings.map((session) => <BookingCard key={session.id} session={session} type="pending" />)
          ) : (
            <p className="text-center py-8 text-muted-foreground">No pending bookings</p>
          )}
        </TabsContent>
      </Tabs>

      {selectedSession && (
        <SessionReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          session={selectedSession}
        />
      )}
    </>
  )
}
