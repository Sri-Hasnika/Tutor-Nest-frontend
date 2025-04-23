"use client"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Calendar, 
  Home, 
  MessageSquare, 
  Search, 
  Settings, 
  User, 
  DollarSign, 
  LineChart, 
  Users 
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function DashboardNav() {
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    // Fetch user role from localStorage or session
    const fetchUserRole = () => {
      // You would replace this with your actual user data retrieval logic
      // This is just a placeholder implementation
      const userData = localStorage.getItem("userData")
      if (userData) {
        const parsedUserData = userData
        console.log("Role:", parsedUserData)
        setUserRole(parsedUserData)
      }
    }

    fetchUserRole()
  }, [])

  const isTutee = userRole === "tutee"
  const isTutor = userRole === "tutor"

  return (
    <nav className="grid items-start gap-2 py-4">
      <Button asChild variant="ghost" className="w-full justify-start gap-2">
        <Link href="/dashboard">
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      
      {/* Tutee-specific navigation items */}
      {isTutee && (
        <>
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/dashboard/courses">
              <BookOpen className="h-4 w-4" />
              My Courses
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/dashboard/find-tutors">
              <Search className="h-4 w-4" />
              Find Tutors
            </Link>
          </Button>
        </>
      )}
      
      {/* Tutor-specific navigation items */}
      {isTutor && (
        <>
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/dashboard/earnings">
              <DollarSign className="h-4 w-4" />
              Earnings
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/dashboard/profile">
              <User className="h-4 w-4" />
              Profile
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/dashboard/progress-tracker">
              <LineChart className="h-4 w-4" />
              Progress Tracker
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="w-full justify-start gap-2">
            <Link href="/dashboard/sessions">
              <Users className="h-4 w-4" />
              Sessions
            </Link>
          </Button>
        </>
      )}
      
      {/* Common navigation items for all user roles */}
      <Button asChild variant="ghost" className="w-full justify-start gap-2">
        <Link href="/dashboard/schedule">
          <Calendar className="h-4 w-4" />
          Schedule
        </Link>
      </Button>
      
      <Button asChild variant="ghost" className="w-full justify-start gap-2">
        <Link href="/dashboard/notifications">
          <MessageSquare className="h-4 w-4" />
          Notifications
          {/* <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            3
          </span> */}
        </Link>
      </Button>
      
      {/* Profile link moved to common section for tutees */}
      {!isTutor && (
        <Button asChild variant="ghost" className="w-full justify-start gap-2">
          <Link href="/dashboard/profile">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </Button>
      )}
      
      <Button asChild variant="ghost" className="w-full justify-start gap-2">
        <Link href="/dashboard/settings">
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </Button>
    </nav>
  )
}