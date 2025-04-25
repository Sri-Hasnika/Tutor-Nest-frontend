import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { SessionManagement } from "@/components/tutor/session-management"

export default function SessionManagementPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Session Management" text="Schedule, organize, and track your tutoring sessions">
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Add New Session
        </Button>
      </DashboardHeader>
      
      <Card className="p-6">
        <SessionManagement />
      </Card>
    </DashboardShell>
  )
}