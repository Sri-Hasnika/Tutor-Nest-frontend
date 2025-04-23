import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import Image from "next/image"

export default function AboutUsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="About Us" text="Learn more about our mission, team, and vision" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {[
          {
            name: "Our Mission",
            description:
              "We aim to make personalized tutoring accessible to everyone, empowering students to succeed through technology-driven learning experiences.",
            icon: "/mission-icon.svg", // Replace with your actual icon/image
          },
          {
            name: "Our Vision",
            description:
              "To revolutionize education by building an intelligent platform that connects learners with the best tutors worldwide.",
            icon: "/vision-icon.svg",
          },
          {
            name: "Our Values",
            description:
              "Integrity, Innovation, Empathy, and Excellence guide us in delivering the best educational experiences.",
            icon: "/values-icon.svg",
          },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex items-center space-x-4">
              <Image src={item.icon} alt={item.name} width={40} height={40} />
              <div>
                <CardTitle>{item.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Meet the Team</CardTitle>
            <CardDescription>The passionate minds behind the platform</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sri Hasnika Venigalla",
                role: "Founder",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Devendra Yalamaddi ",
                role: "Full Stack Developer",
                image: "/placeholder.svg?height=80&width=80",
              },
              // {
              //   name: "",
              //   role: "Product Designer",
              //   image: "/placeholder.svg?height=80&width=80",
              // },
            ].map((member, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium leading-none">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
