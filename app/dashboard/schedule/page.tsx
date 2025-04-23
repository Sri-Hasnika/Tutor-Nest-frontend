import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Plus, Video } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"

export default function SchedulePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Schedule" text="Manage your upcoming sessions and book new ones">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-[1fr_300px]">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <div className="flex justify-end mb-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Sessions</CardTitle>
              <CardDescription>{ Date()}</CardDescription> {/*.split(' ').slice(0, 3).join(' ')*/}
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  subject: "Physics Mechanics",
                  tutor: "Dr. Michael Chen",
                  time: "2:00 PM - 3:30 PM",
                  image: "/placeholder.svg?height=40&width=40",
                  status: "upcoming",
                },
              ].map((session, index) => (
                <div key={index} className="flex items-start space-x-4 rounded-md border p-3">
                  <Image
                    src={session.image || "/placeholder.svg"}
                    alt={session.tutor}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{session.subject}</p>
                    <p className="text-sm text-muted-foreground">with {session.tutor}</p>
                    <div className="flex items-center pt-2">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{session.time}</span>
                    </div>
                  </div>
                  <Button size="sm">
                    <Video className="mr-1 h-3 w-3" />
                    Join
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  subject: "Advanced Calculus",
                  tutor: "Dr. Sarah Johnson",
                  date: "Oct 12",
                  time: "4:00 PM - 5:30 PM",
                  image: "/placeholder.svg?height=40&width=40",
                },
                {
                  subject: "English Literature",
                  tutor: "Prof. Emily Rodriguez",
                  date: "Oct 14",
                  time: "3:00 PM - 4:00 PM",
                  image: "/placeholder.svg?height=40&width=40",
                },
              ].map((session, index) => (
                <div key={index} className="flex items-start space-x-4 rounded-md border p-3">
                  <Image
                    src={session.image || "/placeholder.svg"}
                    alt={session.tutor}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">{session.subject}</p>
                    <p className="text-sm text-muted-foreground">with {session.tutor}</p>
                    <div className="flex items-center pt-2">
                      <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {session.date}, {session.time}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <Tabs defaultValue="upcoming" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                subject: "Advanced Calculus",
                tutor: "Dr. Sarah Johnson",
                date: "Mon, Oct 12",
                time: "4:00 PM - 5:30 PM",
                image: "/placeholder.svg?height=40&width=40",
              },
              {
                subject: "English Literature",
                tutor: "Prof. Emily Rodriguez",
                date: "Wed, Oct 14",
                time: "3:00 PM - 4:00 PM",
                image: "/placeholder.svg?height=40&width=40",
              },
              {
                subject: "Physics Mechanics",
                tutor: "Dr. Michael Chen",
                date: "Fri, Oct 16",
                time: "5:00 PM - 6:30 PM",
                image: "/placeholder.svg?height=40&width=40",
              },
            ].map((session, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle>{session.subject}</CardTitle>
                  <CardDescription>with {session.tutor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutor}
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
                    <Button variant="outline" size="sm" className="w-full">
                      Reschedule
                    </Button>
                    <Button size="sm" className="w-full">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                subject: "Chemistry Basics",
                tutor: "Dr. Robert Lee",
                date: "Mon, Oct 5",
                time: "2:00 PM - 3:30 PM",
                image: "/placeholder.svg?height=40&width=40",
              },
              {
                subject: "Algebra Review",
                tutor: "Dr. Sarah Johnson",
                date: "Wed, Oct 7",
                time: "4:00 PM - 5:00 PM",
                image: "/placeholder.svg?height=40&width=40",
              },
            ].map((session, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle>{session.subject}</CardTitle>
                  <CardDescription>with {session.tutor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutor}
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
                    <Button variant="outline" size="sm" className="w-full">
                      Recording
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Book Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="canceled" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                subject: "Spanish Conversation",
                tutor: "Maria Gonzalez",
                date: "Fri, Oct 2",
                time: "1:00 PM - 2:00 PM",
                image: "/placeholder.svg?height=40&width=40",
                reason: "Tutor unavailable",
              },
            ].map((session, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{session.subject}</CardTitle>
                    <div className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                      Canceled
                    </div>
                  </div>
                  <CardDescription>with {session.tutor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={session.image || "/placeholder.svg"}
                      alt={session.tutor}
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
                    <Button variant="outline" size="sm" className="w-full">
                      Reschedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
