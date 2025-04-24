import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import Image from "next/image"

export default function AboutUsPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="About Us" 
        text="Learn more about our mission, team, and vision" 
      />

      {/* Hero section with background */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-8 mb-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Transforming Education Through Technology</h2>
          <p className="text-muted-foreground">
            We believe in a world where quality education is accessible to everyone, regardless of their background or location.
            Our platform connects passionate learners with expert tutors to create meaningful learning experiences.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <svg width="320" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" />
          </svg>
        </div>
      </div>

      {/* Mission, Vision, Values cards with improved layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {[
          {
            name: "Our Mission",
            description:
              "We aim to make personalized tutoring accessible to everyone, empowering students to succeed through technology-driven learning experiences.",
            icon: "data:image/png;base64,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",
            bgClass: "bg-blue-50",
            iconColor: "text-blue-600" 
          },
          {
            name: "Our Vision",
            description:
              "To revolutionize education by building an intelligent platform that connects learners with the best tutors worldwide.",
            icon: "data:image/png;base64,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",
            bgClass: "bg-purple-50",
            iconColor: "text-purple-600"
          },
          {
            name: "Our Values",
            description:
              "Integrity, Innovation, Empathy, and Excellence guide us in delivering the best educational experiences.",
            icon: "data:image/png;base64,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",
            bgClass: "bg-green-50",
            iconColor: "text-green-600"
          },
        ].map((item, index) => (
          <Card key={index} className="border overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className={`flex flex-col items-center text-center ${item.bgClass} pb-2`}>
              <div className={`rounded-full p-3 ${item.iconColor} bg-white shadow-sm mb-4`}>
                <Image src={item.icon} alt={item.name} width={32} height={32} />
              </div>
              <CardTitle className="text-xl">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <CardDescription className="text-center text-sm">{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team section with improved card design */}
      <div className="mt-12">
        <Card className="border-0 shadow-sm bg-gradient-to-r from-slate-50 to-gray-50">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-2xl">Meet the Team</CardTitle>
            <CardDescription>The passionate minds behind the platform</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sri Hasnika Venigalla",
                  role: "Founder",
                  image: "/placeholder.svg?height=80&width=80",
                  bio: "Passionate about making education accessible to all students worldwide."
                },
                {
                  name: "Devendra Yalamaddi",
                  role: "Full Stack Developer",
                  image: "/placeholder.svg?height=80&width=80",
                  bio: "Building robust and intuitive solutions for the next generation of learners."
                },
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg transition-all hover:bg-white">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-indigo-200 blur-md opacity-70 scale-110"></div>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full relative border-4 border-white shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{member.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground max-w-xs">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join us section */}
      <div className="mt-12 text-center bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're always looking for passionate individuals who share our vision for transforming education.
          Whether you're an educator, developer, or enthusiast - there's a place for you on our team.
        </p>
        <a href="mailto:srihasnika@gmail.com">
  <button className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
    Get in Touch
  </button>
</a>

      </div>
    </DashboardShell>
  )
}