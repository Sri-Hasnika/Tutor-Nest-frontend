import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { ProgressTracker } from "@/components/tutor/progress-tracker"

export default function ProgressTrackerPage() {
  return (
    <DashboardShell>
      
      
      <Card className="p-6">
        <ProgressTracker />
      </Card>
    </DashboardShell>
  )
}