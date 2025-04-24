"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, GraduationCap, Search, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role === "tutee") {
      router.replace("/dashboard")
    } else if (role === "tutor") {
      router.replace("/dashboard/tutor/profile")
    } else {
      setCheckingAuth(false)
    }
  }, [router])

  if (checkingAuth) return null 
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard/courses" className="text-sm font-medium">
              Courses
            </Link>
            <Link href="/dashboard/find-tutors" className="text-sm font-medium">
              Find Tutors
            </Link>
            <Link href="/dashboard/schedule" className="text-sm font-medium">
              Schedule
            </Link>
            <Link href="/dashboard/about" className="text-sm font-medium">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Learn With The Best Tutors
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect with expert tutors, schedule personalized sessions, and achieve your academic goals with our
                    comprehensive tutoring platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/tutors">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Find a Tutor
                    </Button>
                  </Link>
                </div>
              </div>
              <iframe
                src="https://my.spline.design/nexbotrobotcharacterconcept-ispZjZdfr9MJubxuveABfo10/"
                frameBorder="0"
                width="100%"
                height="600px"
                style={{ border: 'none' }}
              ></iframe>
              <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 text-xs font-medium rounded shadow-md z-10">
                EduConnect AI
              </div>

              

            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to connect with tutors and start learning in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Find a Tutor</h3>
                <p className="text-muted-foreground">
                  Search for tutors based on subject, availability, and location to find the perfect match for your
                  learning needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Schedule a Session</h3>
                <p className="text-muted-foreground">
                  Book a demo class or regular session at a time that works for you using our intuitive scheduling
                  system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Start Learning</h3>
                <p className="text-muted-foreground">
                  Connect with your tutor, access learning materials, and track your progress as you achieve your
                  academic goals.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Courses</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most popular courses taught by expert tutors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Mathematics Fundamentals",
                  description: "Master essential math concepts from algebra to calculus with personalized guidance.",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Mathematics",
                },
                {
                  title: "English Literature & Composition",
                  description: "Develop critical reading and writing skills through classic and contemporary texts.",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "English",
                },
                {
                  title: "Computer Science Principles",
                  description: "Learn programming fundamentals and problem-solving techniques for beginners.",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "Computer Science",
                },
              ].map((course, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="aspect-video w-full object-cover"
                  />
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {course.category}
                      </div>
                      <h3 className="text-lg font-bold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <Link href="/courses">
                        <Button variant="outline" className="w-full mt-2">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/courses">
                <Button size="lg" variant="outline">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Top Tutors</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet some of our highly rated tutors ready to help you succeed.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  subject: "Mathematics",
                  rating: "4.9",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Prof. Michael Chen",
                  subject: "Physics",
                  rating: "4.8",
                  image: "/placeholder.svg?height=200&width=200",
                },
                {
                  name: "Ms. Emily Rodriguez",
                  subject: "English Literature",
                  rating: "4.9",
                  image: "/placeholder.svg?height=200&width=200",
                },
              ].map((tutor, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Image
                      src={tutor.image || "/placeholder.svg"}
                      alt={tutor.name}
                      width={100}
                      height={100}
                      className="rounded-full aspect-square object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold">{tutor.name}</h3>
                    <p className="text-sm text-muted-foreground">{tutor.subject} Specialist</p>
                    <div className="flex items-center mt-2 text-yellow-500">
                      <span className="text-sm font-medium">★ {tutor.rating}</span>
                    </div>
                    <Link href="/tutors" className="w-full mt-4">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/tutors">
                <Button size="lg" variant="outline">
                  Browse All Tutors
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Start Learning?</h2>
                  <p className="max-w-[600px] md:text-xl">
                    Join thousands of students who are achieving their academic goals with EduConnect.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto border-primary-foreground">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4">
                    <Users className="h-8 w-8" />
                    <h3 className="text-xl font-bold">5,000+</h3>
                    <p className="text-center text-sm">Active Students</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4">
                    <GraduationCap className="h-8 w-8" />
                    <h3 className="text-xl font-bold">500+</h3>
                    <p className="text-center text-sm">Expert Tutors</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4">
                    <BookOpen className="h-8 w-8" />
                    <h3 className="text-xl font-bold">1,000+</h3>
                    <p className="text-center text-sm">Courses</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4">
                    <Calendar className="h-8 w-8" />
                    <h3 className="text-xl font-bold">10,000+</h3>
                    <p className="text-center text-sm">Sessions Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">EduConnect</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 EduConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
