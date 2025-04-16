import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your personal information and preferences" />

      <div className="grid gap-6 md:grid-cols-2 mt-4">
        {/* User Overview */}
        <Card>
          <CardHeader className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="User"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <CardTitle>Alex Johnson</CardTitle>
              <CardDescription>Frontend Developer</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Passionate about building user-friendly applications and crafting smooth user experiences.
            </p>
          </CardContent>
        </Card>

        {/* Editable Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Alex Johnson" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Frontend Developer" />
            </div>
            <Button className="mt-2">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
