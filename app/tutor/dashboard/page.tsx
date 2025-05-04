import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, DollarSign, MessageSquare, Users } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 4000 },
  { name: 'May', earnings: 6000 },
];
export default function TutorDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tutor Dashboard" text="Welcome back, Dr. Smith!">
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Add Availability
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next session in 3 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,240</div>
            <p className="text-xs text-muted-foreground">+$320 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">4 unread messages</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Sessions</TabsTrigger>
          <TabsTrigger value="students">My Students</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                subject: "Advanced Calculus",
                student: "Jamie Wilson",
                date: "Today",
                time: "4:00 PM - 5:30 PM",
                image: "https://img.freepik.com/premium-photo/indian-girls-sitting-with-laptop-isolated-white_621325-2267.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
                status: "Confirmed"
              },
              {
                subject: "Physics Mechanics",
                student: "Alex Thompson",
                date: "Today",
                time: "6:00 PM - 7:00 PM",
                image: "https://img.freepik.com/premium-photo/indian-young-man-with-backpack-white-background_665346-8807.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
                status: "Pending"
              },
              {
                subject: "Chemistry Review",
                student: "Sam Rodriguez",
                date: "Today",
                time: "8:00 PM - 9:30 PM",
                image: "https://img.freepik.com/free-photo/happy-young-female-student-holding-notebooks-from-courses-smiling-camera-standing-spring-clothes-against-blue-background_1258-70161.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
                status: "Confirmed"
              },
            ].map((session, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{session.subject}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded-full ${session.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {session.status}
                    </span>
                  </div>
                  <CardDescription>with {session.student}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={session.image || "/placeholder.svg"}
                      alt={session.student}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{session.date}</p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Reschedule
                    </Button>
                    <Button size="sm" className="w-full">
                      Start Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            View All Sessions
          </Button>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex Thompson",
                subject: "Mathematics",
                sessions: "12 completed",
                nextSession: "Today, 4:00 PM",
                image: "https://img.freepik.com/free-photo/handsome-serious-bearded-young-guy-walks-along-harbor_273609-20546.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                name: "Jamie Wilson",
                subject: "Physics",
                sessions: "8 completed",
                nextSession: "Today, 6:00 PM",
                image: "https://img.freepik.com/free-photo/hipster-posing-with-coffee_158595-3765.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                name: "Sam Rodriguez",
                subject: "Chemistry",
                sessions: "5 completed",
                nextSession: "Today, 8:00 PM",
                image: "https://img.freepik.com/free-photo/front-view-young-female-student-red-shirt-wearing-backpack-holding-files-copybook-blue-background_140725-40949.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                name: "Taylor Morgan",
                subject: "Biology",
                sessions: "9 completed",
                nextSession: "Tomorrow, 5:00 PM",
                image: "https://img.freepik.com/free-photo/portrait-young-happy-blogger-with-modern-laptop-outdoors_231208-2070.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                name: "Jordan Lee",
                subject: "Computer Science",
                sessions: "3 completed",
                nextSession: "Oct 15, 7:00 PM",
                image: "https://img.freepik.com/premium-photo/pretty-indian-asian-young-college-girl-holding-books-bag-while-standing-isolated-white-background_466689-18227.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                name: "Casey Kim",
                subject: "Mathematics",
                sessions: "6 completed",
                nextSession: "Oct 16, 4:30 PM",
                image: "https://img.freepik.com/premium-photo/woman-with-long-hair-holding-book-with-word-it_777271-67369.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
            ].map((student, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={student.image || "/placeholder.svg"}
                      alt={student.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.subject}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sessions:</span>
                      <span>{student.sessions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next:</span>
                      <span>{student.nextSession}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Progress
                    </Button>
                    <Button size="sm" className="w-full">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            View All Students
          </Button>
        </TabsContent>
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Your earnings for the past 3 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Earnings chart placeholder
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Recent Payments",
                items: [
                  { name: "Alex Thompson", amount: "$120", date: "Oct 10, 2023" },
                  { name: "Jamie Wilson", amount: "$90", date: "Oct 8, 2023" },
                  { name: "Sam Rodriguez", amount: "$150", date: "Oct 5, 2023" },
                ]
              },
              {
                title: "Pending Payments",
                items: [
                  { name: "Taylor Morgan", amount: "$120", date: "Due Oct 15, 2023" },
                  { name: "Jordan Lee", amount: "$90", date: "Due Oct 18, 2023" },
                ]
              },
              {
                title: "Payment Methods",
                content: (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-5 bg-blue-500 rounded"></div>
                        <span>••••4582</span>
                      </div>
                      <span className="text-sm">Default</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Add Payment Method
                    </Button>
                  </div>
                )
              }
            ].map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {section.items ? (
                    <div className="space-y-4">
                      {section?.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center pb-2 border-b">
                          <span className="font-medium">{item.name}</span>
                          <div className="text-right">
                            <div className="font-medium">{item.amount}</div>
                            <div className="text-xs text-muted-foreground">{item.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : section.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}