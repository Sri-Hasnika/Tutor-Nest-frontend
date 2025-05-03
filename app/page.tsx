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
      router.replace("/tutor/dashboard")
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
            <span className="text-xl font-bold">Tutor Nest</span>
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
        <section className="w-full py-8 md:py-16 lg:py-20 bg-gradient-to-b from-muted/50 to-background">
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
                  <Link href="/dashboard/find-tutors">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Find a Tutor
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <iframe
                  src="https://my.spline.design/nexbotrobotcharacterconcept-ispZjZdfr9MJubxuveABfo10/"
                  frameBorder="0"
                  width="100%"
                  height="500px"
                  style={{ border: 'none' }}
                ></iframe>
                <div className="absolute bottom-5 right-5 bg-white px-12 py-3 text-xs font-medium rounded-lg shadow-md z-10">
                  Tutor Nest
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-10 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to connect with tutors and start learning in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-10 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center shadow-sm hover:shadow-md rounded-lg p-6 transition-all duration-200">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Find a Tutor</h3>
                <p className="text-muted-foreground">
                  Search for tutors based on subject, availability, and location to find the perfect match for your
                  learning needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center shadow-sm hover:shadow-md rounded-lg p-6 transition-all duration-200">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Schedule a Session</h3>
                <p className="text-muted-foreground">
                  Book a demo class or regular session at a time that works for you using our intuitive scheduling
                  system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center shadow-sm hover:shadow-md rounded-lg p-6 transition-all duration-200">
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
        <section className="w-full py-10 md:py-16 lg:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Courses</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our most popular courses taught by expert tutors.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Mathematics Fundamentals",
                  description: "Master essential math concepts from algebra to calculus with personalized guidance.",
                  image: "data:image/jpeg;base64,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",
                  category: "Mathematics",
                },
                {
                  title: "English Literature & Composition",
                  description: "Develop critical reading and writing skills through classic and contemporary texts.",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcIenXzde5jel3GOyA963_Is624iFW6zgL4g&s",
                  category: "English",
                },
                {
                  title: "Computer Science Principles",
                  description: "Learn programming fundamentals and problem-solving techniques for beginners.",
                  image: "data:image/png;base64,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",
                  category: "Computer Science",
                },
              ].map((course, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-200">
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
                      <Link href="/dashboard/courses">
                        <Button variant="outline" className="w-full mt-3">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/dashboard/courses">
                <Button size="lg" variant="outline">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-10 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Top Tutors</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet some of our highly rated tutors ready to help you succeed.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  subject: "Mathematics",
                  rating: "4.9",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGuUaxzHjoqpSooRA9F7rWDnM0UbgnSFgUig&s",
                },
                {
                  name: "Prof. Michael Chen",
                  subject: "Physics",
                  rating: "4.8",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpSFN2Ey41bVaf-Yb6vRPbuUXrTCDciHXbA&s",
                },
                {
                  name: "Ms. Emily Rodriguez",
                  subject: "English Literature",
                  rating: "4.9",
                  image: "data:image/jpeg;base64,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",
                },
              ].map((tutor, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="relative">
                      <Image
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        width={100}
                        height={100}
                        className="rounded-full aspect-square object-cover mb-4 ring-2 ring-primary/20"
                      />
                      <div className="absolute bottom-4 right-0 bg-yellow-500 text-white text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center">
                        {tutor.rating}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">{tutor.name}</h3>
                    <p className="text-sm text-muted-foreground">{tutor.subject} Specialist</p>
                    <Link href="/tutors" className="w-full mt-4">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/dashboard/find-tutors">
                <Button size="lg" variant="outline">
                  Browse All Tutors
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-10 md:py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Start Learning?</h2>
                  <p className="max-w-[600px] md:text-xl">
                    Join thousands of students who are achieving their academic goals with Tutor Nest.
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
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4 hover:bg-primary-foreground/15 transition-colors duration-200">
                    <Users className="h-8 w-8" />
                    <h3 className="text-xl font-bold">5,000+</h3>
                    <p className="text-center text-sm">Active Students</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4 hover:bg-primary-foreground/15 transition-colors duration-200">
                    <GraduationCap className="h-8 w-8" />
                    <h3 className="text-xl font-bold">500+</h3>
                    <p className="text-center text-sm">Expert Tutors</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4 hover:bg-primary-foreground/15 transition-colors duration-200">
                    <BookOpen className="h-8 w-8" />
                    <h3 className="text-xl font-bold">1,000+</h3>
                    <p className="text-center text-sm">Courses</p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-primary-foreground/10 p-4 hover:bg-primary-foreground/15 transition-colors duration-200">
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
      <footer className="w-full border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Tutor Nest</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Tutor Nest. All rights reserved.
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