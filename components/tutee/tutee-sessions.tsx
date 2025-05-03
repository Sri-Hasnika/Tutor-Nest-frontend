"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Video, CalendarIcon, BookOpen } from "lucide-react"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TuteeSessions() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sessions, setSessions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const tutee = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : null
  const tuteeId = tutee?._id

  // Fetch all sessions whenever tuteeId or date changes
  useEffect(() => {
    if (!tuteeId || !date) return

    setIsLoading(true)
    const formattedDate = format(date, "yyyy-MM-dd")

    fetch(`https://tutor-nest-backend.onrender.com/session-api/tutee/${tuteeId}?date=${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSessions(data.payload || [])
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error)
        setIsLoading(false)
      })
  }, [tuteeId, date])

  const handleJoinSession = (link: string) => {
    window.open(link, "_blank")
  }

  const formattedDate = date ? format(date, "MM/dd/yyyy") : ""

  const upcomingSessions = sessions.filter((session) => new Date(session.scheduledTime) > new Date())

  const pastSessions = sessions.filter((session) => new Date(session.scheduledTime) <= new Date())

  return (
    <div className="space-y-8">
      <DashboardHeader heading="My Sessions" text="View and join your scheduled tutoring sessions">
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Export Calendar
        </Button>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <div className="col-span-1 space-y-8">
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Sessions scheduled for the future</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <p className="text-center py-4 text-muted-foreground">Loading sessions...</p>
                  ) : upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session) => (
                      <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
                        <BookOpen/>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">{session.title}</p>
                          <p className="text-sm text-muted-foreground">Topic: {session.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            with {session.tutorId?.firstName || "Tutor"} {session.tutorId?.lastName || ""}
                          </p>
                          <div className="flex items-center pt-2">
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(session.scheduledTime), "MMM d, yyyy h:mm a")}
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
                    <p className="text-center py-4 text-muted-foreground">No upcoming sessions</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <CardTitle>Ongoing Sessions</CardTitle>
                  <CardDescription>Previously completed sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <p className="text-center py-4 text-muted-foreground">Loading sessions...</p>
                  ) : pastSessions.length > 0 ? (
                    pastSessions.map((session) => (
                      <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
                        <BookOpen/>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">{session.title}</p>
                          <p className="text-sm text-muted-foreground">Topic: {session.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            with {session.tutorId?.firstName || "Tutor"} {session.tutorId?.lastName || ""}
                          </p>
                          <div className="flex items-center pt-2">
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(session.scheduledTime), "MMM d, yyyy h:mm a")}
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
                    <p className="text-center py-4 text-muted-foreground">No past sessions</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
