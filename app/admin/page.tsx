import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, DollarSign, GraduationCap, Search, User, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AdminNav } from "./admin-nav"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduConnect</span>
            <span className="ml-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-md pl-8" />
            </div>
            <Link href="/admin/profile" className="flex items-center gap-2">
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" src="/placeholder.svg?height=32&width=32" alt="Admin" />
              </span>
              <span className="hidden md:block">Admin User</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <AdminNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your platform and users</p>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <GraduationCap className="mr-2 h-4 w-4" />
                New Course
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,231</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">528</div>
                <p className="text-xs text-muted-foreground">+4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,024</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48,352</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="users" className="space-y-4 mt-6">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage platform users and their permissions</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search users..." className="w-[200px]" />
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button size="sm">Add User</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_1fr_150px_150px_100px] gap-2 p-4 font-medium border-b">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        name: "Alex Johnson",
                        email: "alex.johnson@example.com",
                        role: "Student",
                        status: "Active",
                        image: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        name: "Dr. Sarah Johnson",
                        email: "sarah.johnson@example.com",
                        role: "Tutor",
                        status: "Active",
                        image: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        name: "Michael Smith",
                        email: "michael.smith@example.com",
                        role: "Student",
                        status: "Inactive",
                        image: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        name: "Emily Davis",
                        email: "emily.davis@example.com",
                        role: "Tutor",
                        status: "Pending",
                        image: "/placeholder.svg?height=32&width=32",
                      },
                      {
                        name: "James Wilson",
                        email: "james.wilson@example.com",
                        role: "Student",
                        status: "Active",
                        image: "/placeholder.svg?height=32&width=32",
                      },
                    ].map((user, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_150px_150px_100px] gap-2 p-4 items-center border-b last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={user.image || "/placeholder.svg"}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span>{user.name}</span>
                        </div>
                        <div className="text-muted-foreground">{user.email}</div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.role === "Tutor" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "Inactive"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">Showing 5 of 100 users</div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Course Management</CardTitle>
                      <CardDescription>Manage platform courses and learning materials</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search courses..." className="w-[200px]" />
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button size="sm">Add Course</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[2fr_1fr_150px_150px_100px] gap-2 p-4 font-medium border-b">
                      <div>Course</div>
                      <div>Instructor</div>
                      <div>Category</div>
                      <div>Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        title: "Mathematics Fundamentals",
                        instructor: "Dr. Sarah Johnson",
                        category: "Mathematics",
                        status: "Active",
                        image: "/placeholder.svg?height=40&width=60",
                      },
                      {
                        title: "English Literature & Composition",
                        instructor: "Prof. Emily Rodriguez",
                        category: "English",
                        status: "Active",
                        image: "/placeholder.svg?height=40&width=60",
                      },
                      {
                        title: "Physics Mechanics",
                        instructor: "Dr. Michael Chen",
                        category: "Physics",
                        status: "Draft",
                        image: "/placeholder.svg?height=40&width=60",
                      },
                      {
                        title: "Computer Science Principles",
                        instructor: "Dr. Robert Lee",
                        category: "Computer Science",
                        status: "Active",
                        image: "/placeholder.svg?height=40&width=60",
                      },
                      {
                        title: "Spanish for Beginners",
                        instructor: "Maria Gonzalez",
                        category: "Languages",
                        status: "Review",
                        image: "/placeholder.svg?height=40&width=60",
                      },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[2fr_1fr_150px_150px_100px] gap-2 p-4 items-center border-b last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            width={60}
                            height={40}
                            className="rounded object-cover"
                          />
                          <span className="font-medium">{course.title}</span>
                        </div>
                        <div className="text-muted-foreground">{course.instructor}</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {course.category}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              course.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : course.status === "Draft"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">Showing 5 of 100 courses</div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sessions" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Session Management</CardTitle>
                      <CardDescription>Monitor and manage tutoring sessions</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search sessions..." className="w-[200px]" />
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button size="sm">Export</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-[1fr_1fr_1fr_150px_150px_100px] gap-2 p-4 font-medium border-b">
                      <div>Student</div>
                      <div>Tutor</div>
                      <div>Subject</div>
                      <div>Date</div>
                      <div>Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    {[
                      {
                        student: "Alex Johnson",
                        tutor: "Dr. Sarah Johnson",
                        subject: "Advanced Calculus",
                        date: "Oct 12, 2024",
                        time: "4:00 PM",
                        status: "Scheduled",
                      },
                      {
                        student: "Michael Smith",
                        tutor: "Prof. Emily Rodriguez",
                        subject: "English Literature",
                        date: "Oct 14, 2024",
                        time: "3:00 PM",
                        status: "Scheduled",
                      },
                      {
                        student: "Emily Davis",
                        tutor: "Dr. Michael Chen",
                        subject: "Physics Mechanics",
                        date: "Oct 10, 2024",
                        time: "2:00 PM",
                        status: "Completed",
                      },
                      {
                        student: "James Wilson",
                        tutor: "Dr. Robert Lee",
                        subject: "Computer Science",
                        date: "Oct 8, 2024",
                        time: "5:00 PM",
                        status: "Completed",
                      },
                      {
                        student: "Sophia Garcia",
                        tutor: "Maria Gonzalez",
                        subject: "Spanish",
                        date: "Oct 9, 2024",
                        time: "1:00 PM",
                        status: "Canceled",
                      },
                    ].map((session, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1fr_1fr_150px_150px_100px] gap-2 p-4 items-center border-b last:border-0"
                      >
                        <div className="font-medium">{session.student}</div>
                        <div className="text-muted-foreground">{session.tutor}</div>
                        <div>{session.subject}</div>
                        <div className="text-sm">
                          {session.date}
                          <br />
                          <span className="text-xs text-muted-foreground">{session.time}</span>
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              session.status === "Scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : session.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            <span className="sr-only">Edit</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">Showing 5 of 100 sessions</div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                        1
                      </Button>
                      <Button variant="outline" size="sm">
                        2
                      </Button>
                      <Button variant="outline" size="sm">
                        3
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Analytics & Reports</CardTitle>
                      <CardDescription>View platform performance and user activity</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Last 7 Days
                      </Button>
                      <Button variant="outline" size="sm">
                        Last 30 Days
                      </Button>
                      <Button variant="outline" size="sm">
                        Last 90 Days
                      </Button>
                      <Button size="sm">Export</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">New Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">+248</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted">
                          <div className="h-full w-[75%] rounded-full bg-primary"></div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,024</div>
                        <p className="text-xs text-muted-foreground">+8% from last month</p>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted">
                          <div className="h-full w-[65%] rounded-full bg-primary"></div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Course Enrollments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">+856</div>
                        <p className="text-xs text-muted-foreground">+18% from last month</p>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted">
                          <div className="h-full w-[85%] rounded-full bg-primary"></div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Average Session Rating</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">4.8/5.0</div>
                        <p className="text-xs text-muted-foreground">+0.2 from last month</p>
                        <div className="mt-4 h-1 w-full rounded-full bg-muted">
                          <div className="h-full w-[90%] rounded-full bg-primary"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Popular Subjects</CardTitle>
                        <CardDescription>Most enrolled subjects in the last 30 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { subject: "Mathematics", enrollments: 256, percentage: "85%" },
                            { subject: "Computer Science", enrollments: 198, percentage: "75%" },
                            { subject: "Physics", enrollments: 165, percentage: "65%" },
                            { subject: "English Literature", enrollments: 142, percentage: "55%" },
                            { subject: "Chemistry", enrollments: 128, percentage: "45%" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-[180px] font-medium">{item.subject}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 flex-1 rounded-full bg-muted">
                                    <div
                                      className="h-full rounded-full bg-primary"
                                      style={{ width: item.percentage }}
                                    ></div>
                                  </div>
                                  <div className="w-10 text-right text-sm">{item.enrollments}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>User Activity</CardTitle>
                        <CardDescription>Daily active users over the last 7 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full">
                          {/* This would be a chart in a real implementation */}
                          <div className="flex h-full items-end gap-2">
                            {[65, 75, 70, 90, 85, 60, 80].map((height, index) => (
                              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                                <div className="w-full rounded-t bg-primary" style={{ height: `${height}%` }}></div>
                                <div className="text-xs">
                                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">EduConnect</span>
            <span className="ml-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              Admin
            </span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 EduConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
