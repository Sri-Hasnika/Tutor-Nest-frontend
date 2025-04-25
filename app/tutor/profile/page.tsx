import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User } from "lucide-react"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { TutorProfileForm } from "@/components/tutor/profile-form"

export default function TutorProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tutor Profile" text="Manage your personal and professional information">
        <Button>
          <User className="mr-2 h-4 w-4" />
          Preview Profile
        </Button>
      </DashboardHeader>
      
      <Card className="p-6">
        <TutorProfileForm />
      </Card>
    </DashboardShell>
  )
}