"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar as CalendarIcon, Plus, Video, VideoIcon, Users, Book, ArrowRight } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SchedulePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const isSessionJoinable = (sessionDate:any) => {
    if (!sessionDate) return false;
    
    const now = new Date();
    const sessionTime = new Date(sessionDate);
    
    // Allow joining 15 minutes before the session and up to the session duration (assuming 1 hour sessions)
    const joinWindowStart = new Date(sessionTime);
    joinWindowStart.setMinutes(joinWindowStart.getMinutes() - 15);
    
    const joinWindowEnd = new Date(sessionTime);
    joinWindowEnd.setHours(joinWindowEnd.getHours() + 1);
    
    return now >= joinWindowStart && now <= joinWindowEnd;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        // Get tuteeID from localStorage
        const userString = localStorage.getItem("user");
        if (!userString) {
          console.error("User not found in localStorage");
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userString);
        const tuteeID = user._id;

        // Fetch sessions from the API
        const response = await fetch(`http://localhost:8000/tutee-api/demo-class/booked/${tuteeID}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        // Transform the API response data to match our expected format
        const formattedSessions = data.payload.map(session => ({
          _id: session._id,
          subject: session.subject,
          tuteeId: { name: `${user.firstName} ${user.lastName}` },
          tutorId: {
            name: session.tutorId ? `${session.tutorId.firstName} ${session.tutorId.lastName}` : "Unknown Tutor",
            image: session.tutorId?.profileImage || "/placeholder.svg?height=40&width=40"
          },
          finalDate: session.finalDate ? new Date(session.finalDate).getTime() : null,
          status: session.status,
          meetLink: session.meetLink || "",
          message: session.message,
          createdAt: session.createdAt
        }));

        setSessions(formattedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Filter and sort sessions for selected date
  const sessionsForSelectedDate = sessions
    .filter(session => {
      if (!session.finalDate || !selectedDate) return false;
      const sessionDate = new Date(session.finalDate).toDateString();
      return sessionDate === selectedDate.toDateString();
    })
    .sort((a, b) => a.finalDate - b.finalDate);
  
  // Filter today's sessions
  const todaySessions = sessions
    .filter(session => {
      if (!session.finalDate) return false;
      const today = new Date().toDateString();
      const sessionDate = new Date(session.finalDate).toDateString();
      return today === sessionDate;
    })
    .sort((a, b) => a.finalDate - b.finalDate);

  // Filter upcoming sessions (next 7 days, excluding today)
  const upcomingSessions = sessions
    .filter(session => {
      if (!session.finalDate) return false;
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      const sessionDate = new Date(session.finalDate);
      return sessionDate > today && sessionDate <= nextWeek && 
             sessionDate.toDateString() !== today.toDateString();
    })
    .sort((a, b) => a.finalDate - b.finalDate);

  // Filter past sessions
  const pastSessions = sessions
    .filter(session => {
      if (!session.finalDate) return false;
      return new Date(session.finalDate) < new Date();
    })
    .sort((a, b) => b.finalDate - a.finalDate); // Sort reverse chronologically

  // Get date with sessions to highlight in calendar
  const datesWithSessions = sessions
    .filter(session => session.finalDate)
    .map(session => new Date(session.finalDate).toDateString());

  // Function to get status badge for a session
  const getSessionStatusBadge = (session) => {
    if (!session.finalDate) {
      return <Badge variant="outline">Unscheduled</Badge>;
    }
    
    const sessionTime = new Date(session.finalDate);
    const now = new Date();
    
    if (isSessionJoinable(session.finalDate)) {
      return <Badge className="bg-green-500">In Progress</Badge>;
    } else if (sessionTime > now) {
      return <Badge variant="secondary">Upcoming</Badge>;
    } else {
      return <Badge variant="outline">Completed</Badge>;
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Your Schedule" 
        text="Manage your upcoming sessions and book new ones"
      >
        <Button onClick={()=> router.push('/dashboard/find-tutors')} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </DashboardHeader>

      {/* Quick status overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Today's Sessions</p>
                <p className="text-2xl font-bold">{todaySessions.length}</p>
              </div>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <CalendarIcon className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Upcoming Sessions</p>
                <p className="text-2xl font-bold">{upcomingSessions.length}</p>
              </div>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Past Sessions</p>
                <p className="text-2xl font-bold">{pastSessions.length}</p>
              </div>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Book className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <Card className="col-span-1 overflow-hidden border shadow-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View and manage your scheduled sessions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 md:p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasSession: (date) => 
                    datesWithSessions.includes(date.toDateString())
                }}
                modifiersStyles={{
                  hasSession: { 
                    fontWeight: 'bold',
                    backgroundColor: '#EBF4FF',
                    borderRadius: '50%' 
                  }
                }}
              />
            </div>
            
            <div className="border-t bg-gray-50">
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Sessions on {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h2>
                  <Badge variant="outline" className="ml-2">
                    {sessionsForSelectedDate.length} {sessionsForSelectedDate.length === 1 ? 'Session' : 'Sessions'}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  ) : sessionsForSelectedDate.length === 0 ? (
                    <div className="bg-white rounded-lg border border-dashed border-gray-300 p-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <CalendarIcon className="h-6 w-6 text-gray-500" />
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-900">No sessions scheduled on this date</p>
                      <p className="mt-1 text-sm text-gray-500">Book a session to get started</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={()=> router.push('/dashboard/find-tutors')}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Book New Session
                      </Button>
                    </div>
                  ) : (
                    sessionsForSelectedDate.map((session) => (
                      <div key={session._id} className="flex items-start space-x-4 rounded-lg bg-white border shadow-sm p-4 transition-all hover:border-blue-200 hover:shadow">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <VideoIcon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900">{session.subject}</p>
                            {getSessionStatusBadge(session)}
                          </div>
                          <p className="text-sm text-gray-600">with {session.tutorId.name}</p>
                          <div className="flex items-center pt-2">
                            <Clock className="mr-1 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">
                              {new Date(session.finalDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                        <div>
                          {session.meetLink ? (
                            isSessionJoinable(session.finalDate) ? (
                              <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="shadow-sm">
                                  <Video className="mr-1 h-3 w-3" />
                                  Join Now
                                </Button>
                              </a>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                {new Date(session.finalDate) > new Date() ? 'Not Started' : 'Ended'}
                              </Button>
                            )
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              {session.status === 'pending' ? 'Pending' : 'No Link'}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden border shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b pb-4">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                Today's Sessions
              </CardTitle>
              <CardDescription>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {isLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-16 rounded bg-gray-100"></div>
                    <div className="h-16 rounded bg-gray-100"></div>
                  </div>
                ) : todaySessions.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500">No sessions scheduled for today</p>
                  </div>
                ) : (
                  todaySessions.map((session) => (
                    <div key={session._id} className="flex items-center space-x-3 rounded-lg bg-white border p-3 transition-all hover:border-blue-200 hover:shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <VideoIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-sm">{session.subject}</p>
                        <p className="truncate text-xs text-gray-500">with {session.tutorId.name}</p>
                        {session.finalDate && (
                          <div className="flex items-center mt-1">
                            <Clock className="mr-1 h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {new Date(session.finalDate).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                      {session.meetLink ? (
                        isSessionJoinable(session.finalDate) ? (
                          <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="shrink-0">
                              <Video className="mr-1 h-3 w-3" />
                              Join
                            </Button>
                          </a>
                        ) : (
                          <Button size="sm" variant="outline" disabled className="shrink-0">
                            {new Date(session.finalDate) > new Date() ? 'Soon' : 'Ended'}
                          </Button>
                        )
                      ) : (
                        <Button size="sm" variant="outline" disabled className="shrink-0">
                          {session.status === 'pending' ? 'Pending' : 'No Link'}
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border shadow-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b pb-4">
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-purple-500" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {isLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-16 rounded bg-gray-100"></div>
                    <div className="h-16 rounded bg-gray-100"></div>
                  </div>
                ) : upcomingSessions.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500">No upcoming sessions in the next 7 days</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={()=> router.push('/dashboard/find-tutors')}
                    >
                      <Plus className="mr-2 h-3 w-3" />
                      Book Session
                    </Button>
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <div key={session._id} className="flex items-center space-x-3 rounded-lg bg-white border p-3 transition-all hover:border-purple-200 hover:shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <VideoIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-sm">{session.subject}</p>
                        <p className="truncate text-xs text-gray-500">with {session.tutorId.name}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="mr-1 h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {new Date(session.finalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date(session.finalDate).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0">
                        Reschedule
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="mt-6">
        <div className="border-b mb-4">
          <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0">
            <TabsTrigger 
              value="upcoming" 
              className="rounded-t-lg data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:shadow-sm"
            >
              Upcoming Sessions
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="rounded-t-lg data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:shadow-sm"
            >
              Past Sessions
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full animate-pulse space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="h-48 rounded bg-gray-100"></div>
                  <div className="h-48 rounded bg-gray-100"></div>
                  <div className="h-48 rounded bg-gray-100"></div>
                </div>
              </div>
            ) : upcomingSessions.length === 0 ? (
              <div className="col-span-full bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <CalendarIcon className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No upcoming sessions</h3>
                <p className="mt-2 text-sm text-gray-500">Start by booking a session with one of our tutors</p>
                <Button 
                  className="mt-6"
                  onClick={()=> router.push('/dashboard/find-tutors')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Book Your First Session
                </Button>
              </div>
            ) : (
              upcomingSessions.map((session) => (
                <Card key={session._id} className="overflow-hidden border shadow-sm transition-all hover:shadow-md">
                  <CardHeader className="pb-2 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{session.subject}</CardTitle>
                        <CardDescription>with {session.tutorId.name}</CardDescription>
                      </div>
                      {getSessionStatusBadge(session)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <VideoIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(session.finalDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(session.finalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      {session.meetLink ? (
                        isSessionJoinable(session.finalDate) ? (
                          <a href={session.meetLink} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button size="sm" className="w-full">
                              <Video className="mr-1 h-3 w-3" />
                              Join Session
                            </Button>
                          </a>
                        ) : (
                          <Button size="sm" disabled className="w-full">
                            {new Date(session.finalDate) > new Date() ? 'Not Started' : 'Ended'}
                          </Button>
                        )
                      ) : (
                        <Button size="sm" disabled className="w-full">
                          {session.status === 'pending' ? 'Pending' : 'No Link'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full animate-pulse space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="h-48 rounded bg-gray-100"></div>
                  <div className="h-48 rounded bg-gray-100"></div>
                  <div className="h-48 rounded bg-gray-100"></div>
                </div>
              </div>
            ) : pastSessions.length === 0 ? (
              <div className="col-span-full bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <Book className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No past sessions</h3>
                <p className="mt-2 text-sm text-gray-500">Your completed sessions will appear here</p>
              </div>
            ) : (
              pastSessions.map((session) => (
                <Card key={session._id} className="overflow-hidden border shadow-sm">
                  <CardHeader className="pb-2 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{session.subject}</CardTitle>
                        <CardDescription>with {session.tutorId.name}</CardDescription>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                        <VideoIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(session.finalDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(session.finalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm" className="w-full">
                        Recording
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Book Again
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}