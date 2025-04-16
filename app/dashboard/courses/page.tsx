
"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, Video } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const enrolledCourses = useMemo(() => [
    {
      title: "Mathematics Fundamentals",
      description: "Master essential math concepts from algebra to calculus with personalized guidance.",
      progress: "75%",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mathematics",
      lessons: 24,
      completed: 18,
    },
    {
      title: "English Literature & Composition",
      description: "Develop critical reading and writing skills through classic and contemporary texts.",
      progress: "50%",
      image: "/placeholder.svg?height=200&width=300",
      category: "English",
      lessons: 32,
      completed: 16,
    },
    {
      title: "Physics Mechanics",
      description: "Learn the fundamental principles of classical mechanics and problem-solving techniques.",
      progress: "30%",
      image: "/placeholder.svg?height=200&width=300",
      category: "Physics",
      lessons: 28,
      completed: 8,
    },
    {
      title: "Computer Science Principles",
      description: "Learn programming fundamentals and problem-solving techniques for beginners.",
      progress: "60%",
      image: "/placeholder.svg?height=200&width=300",
      category: "Computer Science",
      lessons: 36,
      completed: 22,
    },
  ].filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  ), [searchTerm])

  return (
    <DashboardShell>
      <DashboardHeader heading="My Courses" text="Manage your enrolled courses and learning materials">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search courses..."
            className="h-9 w-[200px] lg:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Browse Courses
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="enrolled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full object-cover h-40"
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {course.category}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.completed}/{course.lessons} lessons
                    </div>
                  </div>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: course.progress }}></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Materials
                  </Button>
                  <Button size="sm" className="w-full">
                    <Video className="mr-2 h-4 w-4" />
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Introduction to Biology",
                description: "Explore the fundamentals of biology, from cells to ecosystems.",
                image: "/placeholder.svg?height=200&width=300",
                category: "Biology",
                completedDate: "August 15, 2024",
                grade: "A",
              },
              {
                title: "World History: Ancient Civilizations",
                description: "Journey through the ancient world and discover the foundations of human civilization.",
                image: "/placeholder.svg?height=200&width=300",
                category: "History",
                completedDate: "July 22, 2024",
                grade: "A-",
              },
            ].map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full object-cover h-40"
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {course.category}
                    </div>
                    <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      Completed
                    </div>
                  </div>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Completed On</p>
                      <p className="text-sm text-muted-foreground">{course.completedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Final Grade</p>
                      <p className="text-sm text-muted-foreground">{course.grade}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Certificate
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Spanish for Beginners",
                description: "Learn conversational Spanish with a focus on practical, everyday situations.",
                image: "/placeholder.svg?height=200&width=300",
                category: "Languages",
                tutor: "Maria Gonzalez",
                price: "$49.99",
              },
              {
                title: "Digital Marketing Fundamentals",
                description: "Master the basics of digital marketing, from SEO to social media strategies.",
                image: "/placeholder.svg?height=200&width=300",
                category: "Marketing",
                tutor: "James Wilson",
                price: "$59.99",
              },
            ].map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full object-cover h-40"
                />
                <CardHeader className="pb-2">
                  <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {course.category}
                  </div>
                  <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Instructor</p>
                      <p className="text-sm text-muted-foreground">{course.tutor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Price</p>
                      <p className="text-sm text-muted-foreground">{course.price}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Remove
                  </Button>
                  <Button size="sm" className="w-full">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        {/* Completed and Saved Tabs – unchanged */}
        {/* You can copy your original content for these tabs here */}
      </Tabs>
    </DashboardShell>
  )
}
