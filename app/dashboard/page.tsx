import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, MessageSquare } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "./dashboard-header"
import { DashboardShell } from "./dashboard-shell"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back, Alex!">
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule a Session
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next session in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 courses in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+2.5 hours from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 unread messages</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="tutors">My Tutors</TabsTrigger>
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
          <Button variant="outline" className="w-full">
            View All Sessions
          </Button>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Mathematics Fundamentals",
                progress: "75%",
                nextLesson: "Differential Equations",
                image: "/placeholder.svg?height=100&width=200",
              },
              {
                title: "English Literature & Composition",
                progress: "50%",
                nextLesson: "Shakespeare's Sonnets",
                image: "/placeholder.svg?height=100&width=200",
              },
              {
                title: "Physics Mechanics",
                progress: "30%",
                nextLesson: "Newton's Laws of Motion",
                image: "/placeholder.svg?height=100&width=200",
              },
              {
                title: "Computer Science Principles",
                progress: "60%",
                nextLesson: "Data Structures",
                image: "/placeholder.svg?height=100&width=200",
              },
            ].map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={200}
                  height={100}
                  className="w-full object-cover h-32"
                />
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>Progress: {course.progress}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: course.progress }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Next lesson: {course.nextLesson}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Materials
                    </Button>
                    <Button size="sm" className="w-full">
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            View All Courses
          </Button>
        </TabsContent>
        <TabsContent value="tutors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Sarah Johnson",
                subject: "Mathematics",
                rating: "4.9",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Prof. Emily Rodriguez",
                subject: "English Literature",
                rating: "4.8",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Dr. Michael Chen",
                subject: "Physics",
                rating: "4.9",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((tutor, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Image
                    src={tutor.image || "/placeholder.svg"}
                    alt={tutor.name}
                    width={80}
                    height={80}
                    className="rounded-full aspect-square object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold">{tutor.name}</h3>
                  <p className="text-sm text-muted-foreground">{tutor.subject} Specialist</p>
                  <div className="flex items-center mt-2 text-yellow-500">
                    <span className="text-sm font-medium">★ {tutor.rating}</span>
                  </div>
                  <div className="mt-4 flex space-x-2 w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Message
                    </Button>
                    <Button size="sm" className="w-full">
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            Find More Tutors
          </Button>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
