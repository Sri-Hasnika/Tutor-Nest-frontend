"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Video, CalendarIcon, BookOpen } from "lucide-react"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { useRouter } from "next/navigation"
import { AddSessionModal } from "./add-session-modal"
import { format } from "date-fns"

export function SessionManagement() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sessions, setSessions] = useState<any[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [sessionPlans, setSessionPlans] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const tutor = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : null
  const tutorId = tutor?._id

  // Fetch all session plans for this tutor
  useEffect(() => {
    if (!tutorId) return

    const fetchSessionPlans = async () => {
      try {
        const res = await fetch(`http://localhost:8000/sessionPlan-api/?tutorId=${tutorId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        const data = await res.json()
        if (data.payload.length > 0) {
          setSessionPlans(data.payload || [])
        }
      } catch (error) {
        console.error("Error fetching session plans:", error)
      }
    }

    fetchSessionPlans()
  }, [tutorId])

  // Fetch all sessions whenever tutorId or date changes
  useEffect(() => {
    if (!tutorId || !date) return

    setIsLoading(true)
    const formattedDate = format(date, "yyyy-MM-dd")

    fetch(`http://localhost:8000/session-api/tutor/${tutorId}?date=${formattedDate}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.payload.length > 0) {
          setSessions(data.payload || [])
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error)
        setIsLoading(false)
      })
  }, [tutorId, date])

  const handleJoinSession = (link: string) => {
    window.open(link, "_blank")
  }

  const handleAddSession = async (newSession: any) => {
    try {
      const res = await fetch("http://localhost:8000/session-api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...newSession,
          tutorId,
        }),
      })

      const data = await res.json()
      console.log(data);

      if (data.status===201) {
        // Refresh sessions list
        const formattedDate = format(date!, "yyyy-MM-dd")
        const sessionsRes = await fetch(`http://localhost:8000/session-api/tutor/${tutorId}?date=${formattedDate}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        const sessionsData = await sessionsRes.json()

        if (sessionsData.payload.length > 0) {
          setSessions(sessionsData.payload || [])
        }

        setIsAddModalOpen(false)
      }
    } catch (error) {
      console.error("Error adding session:", error)
    }
  }
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const formattedDate = date ? format(date, "MM/dd/yyyy") : ""

  return (
    <div className="space-y-8">
      <DashboardHeader heading="Session Management" text="Schedule, organize, and track your tutoring sessions">
        <Button onClick={() => setIsAddModalOpen(true)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Add New Session
        </Button>
      </DashboardHeader>

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
          <Card>
            <CardHeader>
              <CardTitle>Sessions on {formattedDate}</CardTitle>
              <CardDescription>Filtered by selected date</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <p className="text-center py-4 text-muted-foreground">Loading sessions...</p>
              ) : sessions.length > 0 ? (
                sessions.map((session) => (
                  <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
                    <BookOpen/>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{session.title}</p>
                      <p className="text-sm text-muted-foreground">Topic: {session.topic}</p>
                      <p className="text-sm text-muted-foreground">
                        with {session.tuteeId?.firstName || "Tutee"} {session.tuteeId?.lastName || ""}
                      </p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(session.scheduledTime).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleJoinSession(session.meetLink)}>
                      <Video className="mr-1 h-3 w-3" />
                      Join
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No sessions for this date</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <AddSessionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSession}
        sessionPlans={sessionPlans}
      />
    </div>
  )
}
