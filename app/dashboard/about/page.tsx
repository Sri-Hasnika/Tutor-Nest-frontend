"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, FlagIcon, LightbulbIcon, HeartHandshakeIcon, LinkedinIcon, GithubIcon, MailIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const missions = [
  {
    name: "Our Mission",
    description:
      "We aim to make personalized tutoring accessible to everyone, empowering students to succeed through technology-driven learning experiences.",
    icon: FlagIcon,
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Our Vision",
    description:
      "To revolutionize education by building an intelligent platform that connects learners with the best tutors worldwide.",
    icon: LightbulbIcon,
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    name: "Our Values",
    description:
      "Integrity, Innovation, Empathy, and Excellence guide us in delivering the best educational experiences.",
    icon: HeartHandshakeIcon,
    color: "bg-chart-1/10 text-chart-1",
  },
]

const teamMembers = [
  {
    name: "Sri Hasnika Venigalla",
    role: "Founder",
    bio: "Passionate about revolutionizing education through technology. Expert in personalized learning and educational psychology.",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    social: [
      { icon: LinkedinIcon, url: "#", label: "LinkedIn" },
      { icon: GithubIcon, url: "#", label: "GitHub" },
      { icon: MailIcon, url: "mailto:contact@example.com", label: "Email" }
    ]
  },
  {
    name: "Devendra Yalamaddi",
    role: "Full Stack Developer",
    bio: "Experienced developer specialized in educational platforms and interactive learning tools. Passionate about user experience and accessibility.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    social: [
      { icon: LinkedinIcon, url: "#", label: "LinkedIn" },
      { icon: GithubIcon, url: "#", label: "GitHub" },
      { icon: MailIcon, url: "mailto:contact@example.com", label: "Email" }
    ]
  }
]

export default function AboutUsPage() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll")
    elementsToAnimate.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      elementsToAnimate.forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  return (
    <DashboardShell>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <DashboardHeader 
            heading="About Us" 
            text="Learn more about our mission, team, and vision" 
          />

          {/* Hero Section */}
          <section className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ease-out py-10">
            <div className="relative rounded-2xl bg-muted/50 p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-chart-1/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Transforming Education</h2>
                <p className="text-muted-foreground text-lg mb-6">
                  We're on a mission to make high-quality tutoring accessible to everyone.
                  By combining technology with personalized learning approaches, we're
                  creating a platform where every student can thrive.
                </p>
                <Button className="group">
                  Join our journey
                  <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ease-out py-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Our Philosophy</h2>
            
            <div className="grid gap-6 md:grid-cols-3">
              {missions.map((item, index) => (
                <Card 
                  key={index} 
                  className="group overflow-hidden transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/20"
                >
                  <CardHeader className="pb-2 relative">
                    <div className={cn("absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10", item.color.split(" ")[0])} />
                    <div className="flex items-center gap-4 mb-1">
                      <div className={cn("p-2 rounded-full", item.color)}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {item.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 bg-muted/50 rounded-lg p-8 relative overflow-hidden border border-border/50">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-chart-2/10 rounded-full" />
              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-chart-1/10 rounded-full" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3">Why Choose Us?</h3>
                <p className="text-muted-foreground max-w-3xl">
                  We combine cutting-edge technology with expert tutoring to deliver personalized learning experiences.
                  Our platform adapts to each student's unique needs, ensuring optimal educational outcomes and
                  building confidence through continuous support and feedback.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ease-out py-12">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Meet the Team</h2>
            
            <div className="grid gap-8 md:grid-cols-2">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden group transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/20"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-bold text-xl text-foreground">{member.name}</h3>
                      <p className="text-primary/90 font-medium">{member.role}</p>
                    </div>
                  </div>
                    
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{member.bio}</p>
                    
                    <div className="flex gap-2">
                      {member.social.map((item, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="icon"
                          className="rounded-full h-9 w-9 transition-colors hover:bg-primary hover:text-primary-foreground"
                          asChild
                        >
                          <a href={item.url} aria-label={item.label}>
                            <item.icon className="h-4 w-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ease-out delay-200">
              <h3 className="text-xl font-bold mb-3">Join Our Team</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We're always looking for talented individuals who are passionate about education
                and technology. If you're interested in making a difference, we'd love to hear from you.
              </p>
              <Button>View Open Positions</Button>
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  )
}