import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LineChart, BookOpen } from "lucide-react"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { ProgressTracker } from "@/components/tutor/progress-tracker"

export default function ProgressTrackerPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tutee Progress Tracker" text="Monitor and analyze your students' learning journey">
        <Button>
          <LineChart className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </DashboardHeader>
      
      <Card className="p-6">
        <ProgressTracker />
      </Card>
    </DashboardShell>
  )
}