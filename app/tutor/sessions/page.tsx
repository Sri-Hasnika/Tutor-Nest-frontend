import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { SessionManagement } from "@/components/tutor/session-management"

export default function SessionManagementPage() {
  return (
    <DashboardShell>
      <Card className="p-6">
        <SessionManagement />
      </Card>
    </DashboardShell>
  )
}