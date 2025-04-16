import { Button } from "@/components/ui/button"
import { BarChart, BookOpen, Calendar, Home, Settings, User, Users } from "lucide-react"
import Link from "next/link"

export function AdminNav() {
  return (
    <nav className="grid items-start gap-2 py-4">
      <Link href="/admin">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Home className="h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/admin/users">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Users className="h-4 w-4" />
          Users
        </Button>
      </Link>
      <Link href="/admin/tutors">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <User className="h-4 w-4" />
          Tutors
        </Button>
      </Link>
      <Link href="/admin/courses">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <BookOpen className="h-4 w-4" />
          Courses
        </Button>
      </Link>
      <Link href="/admin/sessions">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Calendar className="h-4 w-4" />
          Sessions
        </Button>
      </Link>
      <Link href="/admin/reports">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <BarChart className="h-4 w-4" />
          Reports
        </Button>
      </Link>
      <Link href="/admin/settings">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </Link>
    </nav>
  )
}
