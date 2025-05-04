
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
      image: "https://img.freepik.com/free-vector/isometric-maths-material-background_23-2148146102.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
      category: "Mathematics",
      lessons: 24,
      completed: 18,
    },
    {
      title: "English Literature & Composition",
      description: "Develop critical reading and writing skills through classic and contemporary texts.",
      progress: "50%",
      image: "https://img.freepik.com/free-vector/flat-world-poetry-day-illustration_23-2149293954.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
      category: "English",
      lessons: 32,
      completed: 16,
    },
    {
      title: "Physics Mechanics",
      description: "Learn the fundamental principles of classical mechanics and problem-solving techniques.",
      progress: "30%",
      image: "https://img.freepik.com/free-vector/background-about-physics_1284-698.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
      category: "Physics",
      lessons: 28,
      completed: 8,
    },
    {
      title: "Computer Science Principles",
      description: "Learn programming fundamentals and problem-solving techniques for beginners.",
      progress: "60%",
      image: "https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18383.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
      category: "Computer Science",
      lessons: 36,
      completed: 22,
    },
    {
      title: "Art & Design Basics",
      description: "Unleash creativity by learning fundamental art techniques and design principles.",
      progress: "20%",
      image: "https://img.freepik.com/free-photo/top-view-assortment-with-art-supplies_23-2148577663.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
      category: "Art",
      lessons: 20,
      completed: 4,
    },
    {
      title: "Economics for Beginners",
      description: "Learn the basics of microeconomics and macroeconomics with real-world examples.",
      progress: "55%",
      image: "https://img.freepik.com/free-vector/economy-school-subject-concept-student-studying-economics-budget-idea-global-economics-investment-foundation-vector-illustration-cartoon-style_613284-1522.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
      category: "Economics",
      lessons: 22,
      completed: 12,
    },
    {
      title: "Environmental Science",
      description: "Understand ecosystems, sustainability, and the human impact on the environment.",
      progress: "65%",
      image: "https://img.freepik.com/premium-photo/biologist-scientist-doctor-dropping-liquid-petri-dish-with-fungi-colony-using-medical-micropippete-analyzing-bacteria-cell-microbiologist-researcher-working-pharmacology-hospital-laboratory_482257-29224.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
      category: "Science",
      lessons: 25,
      completed: 16,
    },
    {
      title: "World History",
      description: "Explore key historical events and movements from ancient to modern times.",
      progress: "70%",
      image: "https://img.freepik.com/free-psd/globe-open-antique-book-world-exploration-education-learning-knowledge_632498-49826.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
      category: "History",
      lessons: 26,
      completed: 18,
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
            {enrolledCourses?.map((course, index) => (
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
                image: "https://img.freepik.com/free-photo/flat-lay-arrangement-with-study-items_23-2148785014.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
                category: "Biology",
                completedDate: "August 15, 2024",
                grade: "A",
              },
              {
                title: "World History: Ancient Civilizations",
                description: "Journey through the ancient world and discover the foundations of human civilization.",
                image: "https://img.freepik.com/free-vector/ancient-science-flowchart-with-alchemy-medicine-symbols-isometric-vector-illustration_1284-81196.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
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
                image: "https://img.freepik.com/free-photo/learn-spanish-language-online-education-concept_53876-132596.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
                category: "Languages",
                tutor: "Maria Gonzalez",
                price: "$49.99",
              },
              {
                title: "Digital Marketing Fundamentals",
                description: "Master the basics of digital marketing, from SEO to social media strategies.",
                image: "https://img.freepik.com/premium-photo/notebook-with-tools-notes-about-digital-marketing-concept_132358-3547.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&w=740",
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
