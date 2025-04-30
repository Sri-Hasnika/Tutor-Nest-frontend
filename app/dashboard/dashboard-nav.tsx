"use client"

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
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const [userRole, setUserRole] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const fetchUserRole = () => {
      const userData = localStorage.getItem("role")
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

  const NavLink = ({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) => {
    const isActive = pathname === href
    
    return (
      <Button
        asChild
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 transition-all duration-200",
          "hover:bg-muted/50 hover:translate-x-1",
          "relative overflow-hidden group",
          isActive && "bg-muted/30 font-medium"
        )}
      >
        <Link href={href}>
          <Icon className={cn(
            "h-4 w-4 transition-colors duration-200",
            isActive ? "text-foreground" : "text-muted-foreground",
            "group-hover:text-foreground"
          )} />
          <span className={cn(
            "transition-colors duration-200",
            isActive ? "text-foreground" : "text-muted-foreground",
            "group-hover:text-foreground"
          )}>
            {children}
          </span>
          {isActive && (
            <span className="absolute inset-y-0 left-0 w-[2px] bg-foreground" />
          )}
        </Link>
      </Button>
    )
  }

  return (
    <nav className="flex flex-col gap-1 p-4">
      {/* <NavLink href="/dashboard" icon={Home}>
        Dashboard
      </NavLink> */}
      
      {isTutee && (
        <>
          <NavLink href="/dashboard" icon={Home}>
            Dashboard
          </NavLink>
          <div className="mt-6 mb-2 px-3">
            <p className="text-xs font-medium text-muted-foreground">Learning</p>
          </div>
          <NavLink href="/dashboard/courses" icon={BookOpen}>
            My Courses
          </NavLink>
          <NavLink href="/dashboard/find-tutors" icon={Search}>
            Find Tutors
          </NavLink>
          <div className="mt-6 mb-2 px-3">
            <p className="text-xs font-medium text-muted-foreground">General</p>
          </div>
          <NavLink href="/dashboard/schedule" icon={Calendar}>
            Schedule
          </NavLink>
          <NavLink href="/dashboard/notifications" icon={MessageSquare}>
            Notifications
          </NavLink>
          <NavLink href="/dashboard/profile" icon={User}>
            Profile
          </NavLink>
        </>
      )}
      
      {isTutor && (
        <>
          <NavLink href="/tutor/dashboard" icon={Home}>
            Dashboard
          </NavLink>
          <div className="mt-6 mb-2 px-3">
            <p className="text-xs font-medium text-muted-foreground">Teaching</p>
          </div>
          <NavLink href="/tutor/sessionPlans" icon={BookOpen}>
            SessionPlans
          </NavLink>
          <NavLink href="/tutor/earnings" icon={DollarSign}>
            Earnings
          </NavLink>
          <NavLink href="/tutor/profile" icon={User}>
            Profile
          </NavLink>
          <NavLink href="/tutor/progress-tracker" icon={LineChart}>
            Progress Tracker
          </NavLink>
          <NavLink href="/tutor/sessions" icon={Users}>
            Sessions
          </NavLink>
          <div className="mt-6 mb-2 px-3">
            <p className="text-xs font-medium text-muted-foreground">General</p>
          </div>
          <NavLink href="/tutor/notifications" icon={MessageSquare}>
            Notifications
          </NavLink>
        </>
      )}
      
      {/* <div className="mt-6 mb-2 px-3">
        <p className="text-xs font-medium text-muted-foreground">General</p>
      </div>
      <NavLink href="/dashboard/schedule" icon={Calendar}>
        Schedule
      </NavLink>
      <NavLink href="/dashboard/notifications" icon={MessageSquare}>
        Notifications
      </NavLink>
       */}
      {/* {!isTutor && (
        <NavLink href="/dashboard/profile" icon={User}>
          Profile
        </NavLink>
      )} */}
      
      <div className="mt-auto pt-6">
        <NavLink href="/dashboard/about" icon={Settings}>
          About Us
        </NavLink>
      </div>
    </nav>
  )
}