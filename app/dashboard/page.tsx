"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Clock, MessageSquare, Star } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "./dashboard-header"
import { DashboardShell } from "./dashboard-shell"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const router = useRouter();
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back, Alex!">
        <Button 
          onClick={() => router.push('/dashboard/schedule')}
          className="group transition-all hover:shadow-md"
        >
          <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Schedule a Session
        </Button>
      </DashboardHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next session in 2 days</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 courses in progress</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+2.5 hours from last week</p>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">3 unread messages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4 mt-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="upcoming" className="flex-1 sm:flex-none">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="courses" className="flex-1 sm:flex-none">My Courses</TabsTrigger>
          <TabsTrigger value="tutors" className="flex-1 sm:flex-none">My Tutors</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                subject: "Advanced Calculus",
                tutor: "Dr. Sarah Johnson",
                date: "Mon, Oct 12",
                time: "4:00 PM - 5:30 PM",
                image: "https://img.freepik.com/free-photo/front-view-woman-posing_23-2148680245.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                subject: "English Literature",
                tutor: "Prof. Emily Rodriguez",
                date: "Wed, Oct 14",
                time: "3:00 PM - 4:00 PM",
                image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSERUSExIVFRUWGRUYFxUXFxcVFhgWGBoYGBkYGBUYHSggGBolHRgVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0fHSEtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLf/AABEIAMsA+AMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgIDBAUHAQj/xAA/EAABAwEFBAgEAwcDBQAAAAABAAIRAwQFEiExBkFRYQcTInGBkaGxMsHR8BRCUiMzcoKi4fFDYpIVFiQ0sv/EABkBAQADAQEAAAAAAAAAAAAAAAABAgQDBf/EACIRAQACAgICAgMBAAAAAAAAAAABAgMRITEEEhRBIlFhE//aAAwDAQACEQMRAD8AmqIiq6iIiAiIgIiICIiAiIgItbeV+0KHxvE8BmVHLR0g0wYFORxJj65KUbTVFDqm3lNrMWBxPDIDxJVih0j0ph9F4HEEO9ENpwiwLqvijaG4qTw7iNCO8HMLPUJEREBERAREQEREBERAREQEREBERAREQEREBERAREQCVCNq9qSCadExGTnfIFbHbO++qZ1TDD3DM/pbx7zuXN7VUyncNBzQWalUvJJk8yrYpY3BuQBIk7wFbsgdWfgYJPABT64dgauEPfkTxVb3iva1Mc36RG8bP1ZwmABpzBWurgbs+5dYtGxcthxB9fdQi+NmBSccAiN25VrmiVrYLQjNkvB9J4fTeWuGhBg/fIrqexm2AtP7KrAqgajIPHEDceS5NbqZaYP33qxYra6k9r2khzSCDwIXbW3DepfR6LQ7IbQMtlEOGT25PbwPEcjqPHgt8oXERFAIiICIiAiIgIiICIiAiIgIiICIiAiIgKzbLS2mxz3GA0TKvKEdIF6kN6pvcebj9B7qRFbxtpr1XPP5j6aAeAWjtGKtVFCnrMErKr1urYTvAPmdFmdF1APtJe7MjNVtPrWZTSvtaIdW2I2No2Sk1xaHVCBLiNO5Sl5AWIy2GFhVrdE5rz5mZ5ejFdMm2WmNFG7wa184gr1rvEaFai07Q2duRdiPBvaKtFZ+kWtH2h21lz9kuaNNygdTIrrNe3065gAt5OBEjlxXPdo7r6irH5Tm08uC24bfUsGesdwu7I306zV21ActHji1d6oVQ5ocN6+caNIxiybvaDMu++a7bsFeYrWSnnJaMJ/lJHnAC6WcqpIiIqriIiAiIgIiICIiAiIgIiICIiAiIgIiILVqqhjC45AAknkAuO31ePW1i4nIEn6lS/pCvktHUM+Jwz5D79wueVSIgeJ+/BEMK868g893t6NHmt90YVwys4uIDQCSTuhRS8Kk/f3yW82JpYi4cxlxUZI/CYWxz+cadOvbbNjBFOm9/wDuMNHqsa477/EPIIgnQSCtHa9n7VUxEl1MZYSGlxI5xu5AjiZ3bzZDZh7HNecUM/M7IkzrGfussxSK8NkTebcsTbCzOYQHSB7qIkVWAGnRLg7QiQ3LiRmO8ldd2ysragpuhYd37O0KjQXEzwxGfdK5IiEWxTaULuOyVXOMtiDxkR45+C821sGKkDGbT6FdKdYKFFmFgA9/NQraZssdCmt/y2i+PVeXMrRTikXE6ZBSHYK/jZnw7OmTLv8AbMDF7T4LTbQWgFwY2P1Oy37h5e6wrvtmB4gCIcCOMgg6citkcwxW4nh9GscCARoc16oFsbtiIoWatTLcXYpVsQc1xBgNdHwnQeXFT1QkREUJEREBERAREQEREBERAREQEREBCiFBx7au0h9qqSdIUVtlr3CFm7YFzLXVByhx8RAhaIOJk+atEKTKlwLipR0d2gMtYY782ngtLZqPYa771+/Je2Kv1Nop1P0vE9x19JUXjdZhak+tol9M2aqwUwXRotW7aGmawogtAgkuOQAAlRa3324NDROYyjetdcdtpsqOq13hrYjPn7rBFOHqTeInhLdob+pCkADi7swofUvJ9VwfTBp4RGX5u8BUXvXs7yeppVTqYa3CO+IOWfqsDHXY3RtMRlIxOORMRvOSvWnDle07bSpfbyIcSCrQtJe1wPArUXWKrnB9UiCfhgeHirt8WsUqVR2/CQO85D1KtrnTna065c+qVi44jvVdH6qwFdolbWBILtaBRbXAOKjWpF0aFsy138QcI/m5rvNN8gHjmuQ3VYmG7nuGZOTuRxNMnhoAFOLittekG0asOAgMqAOIcwafCDn3wqS6QlCLxpkSvVCRERAREQEREBERAREQEREBERAJjXJau+r/AKFlaDVfm6cLRm49wCt7U2WpVoYaZjtNLoyJE/WD4Ll20VOu2o7rROCBORMH4fl3INbtfavxNU1g3DOQHIaErVWeyy0k6GfSFfvAnCJPePpGqtWGS2Dx+gVo6VmOVxj4px4jzI+iw7a1XmM7RHd9VYttWXmNB7/fsiJ6TzY2/W1WNpVIL2CM/wAzYgEcTuK3v/R6NeqS5kgiBvA8Fx2nVLXBzSQQZBGRCm+y23Dqbx1rZ/3Df3jce5Z74pjmrRizx1ZMbS59BuEBxAGGWunLgQ6SDktHWqPqGMJA3k9p0cJU3o7Q2Oq3GSwngQCQtReG0dEThjLSAAuMTP6a5mNcaak0erZiOUDIKD7V2lzsA/LJPeco9ypLeN5OrHgFGdo6ZIbyXbH2yZeuGgCvWfgrUQsqwMa58F2HWCePyWlkhtrnvl1EOZOTokES08DG4jWR6rp+x96OfTBDC9oAEAglvIce7LjI0XK7BJcWANcakUwXCQC5wGLwEmV1jo0sYp2VxBkOqOInXCAAPZVl0hK6LpE4S3kdVWiKFhERAREQEREBERAREQEREBERAIXMOkQw11RuhyPMA5DuyC6LbXPwkNhgjN5iBzA+sLl17g2qphYS5gyaSIEDVwHDXMn3QQ/qi9o554uP9tV7IY2OH3KzLQWUnPYDOHKfkOS01e0YjnopVnhbdXMk8VZcIV6nTBz3SqazY9VZSVlX7GO0FaaFsLDZzKraeFqV5byyUslmCz8l5d9LJbijZ5Wa0tdYaxtKAsa3WbG2Fv69ihYV7EUKLqhGmQHFx0H3zUVnclo1CA2xuF5bMx9wrIR0kycycyeaALZEMMzy2NG0mmWFsZEOGo+H6/NdE2M25s9KkadfEztOIIa54OIyfhGWcrmXWSM1cpKfWJT7ad+sG01krQKdopknRpOBx/lfBW2XziCpnsPtbWp1qVne8voucGAOIlhcQAQ4iYB/LMKJqtF3W0RFRcREQEREBERAREQEREBEQlBoNta5bZXgT2uz55KDY+osbHNjG8Zk7gJgZaZx3qVbe3iwUerBBdiBjXjlC57XtRfhDtGgCO756qNp0j9obBD3bwT4rDcB4raXo8EBu8T9Vq6TQHCdN/cFeFLK2UTE6D7/ALqw86RuELKtdtxSIgcFjNCKz/ClqFLLtsYICiBKlWzlokA7xrzIVMnTrinnST2SxreWOyDgrF3DFGS31msyx2s3VpDF/Bhx00XOeka8A+sKDfhpfFzqEfIQO8ldNvy2Cy2epXP5RkOLjk0eJIXCqzy5xc4y5xJJ4kmSfOV28au59pcPKtqPWFjCvSICutardbWFslhCJI55lX+A4+ysuycO5XpgF3kpQ9e7OBu1VxjiM9DrI3FW6bYHfmqpQfQOz14fiLLRrb3sGL+IZO/qBWwUC6KL2DqTrKQZZL2ndgcRI7w4+qnq5THLtE7gREUJEREBERAREQEREBR7aG9HB/U0/igSeEzA++KkKiu0bDTrtq6tMYuRAI9cvJBEb+Z1btS+o4ancDrA0H+fGPVnhomZnRSO+XEEV3mS9hPIFs9kcsx5SoHanlxBJUaTtTaiSee9U13Yn4Rwg9+8q5Rdik7hlmrGGXdkZjfuV1JeWiz4d+c6clbjLx/t996u2l2eqpY/skbxp8/kisqWtHqFsrhrYawb+ojLn/ha1uq9FQhwcDmCCDzGfukxuNJrOp27bctmkCVKLNZgo1sfbW16DKjd4zHA6EeBlS2kQ0EkwBmTyC82/enq0mNbcu6Xr1mpTsjTkwdY/wDiMhg8BiP8wXOCtjft4m02mrXP+o8uHJujR4NDR4LXgL0cVfWsQ8vLf2tMqgscZlZD9Fas4zXRzUWk9rwV6qdBzVi0/Eq6x7QRDJleEga6oxq9yGikTXome38Y6ZBNJ4bzOJhPoCfBdcXHOit4/HiQM6dTDyOWfliHiuxrnbt0p0IiKq4iIgIiICIiAiIgFR/ai0t6l1MZvdAECYMjM/Rbq2PIY4jWPLmodtJbMFMObkIIYTEkk/Hn4oIttTa4JpNPYBkjXCYiJ7lF3gAcZErbXuwmmCdCf7yTvJzK0dZwAz3xlyE/3SBg1HxPpyVVO0ENgd55qmo6dVfoBkST4Kzmt2cyT+oqmvAMBW3ZHJCUNqWmFWwKpkEx5fRekDd496mFU36Mr66qq6gT2X9pvePiHlB8Cpztze3VXfWIObwKYzz7eR8m4j4LilktLqT21G6sII8N3jmPFSrbK+eupUGNMtM1PSG+71wvi3kiWmmXWOYRZetXgVYC0Myiscl5QC9eF4HgBSMa0HtFXXHtBWHFXmfEFAywjvRGhekKRvuj50XjZ84kuHgWPXcV893FVLLTRfigirTz4DEJ8IlfQpVbdr0eIiKi4iIgIiICIiAiIgorMDmkHQqBbSWFzqQ3mmC0CdzcTMuYAbPGV0ArWWyz0xSPWRhlziTlqSddyDjV4Wg/hmsIkhxcHT+WPhI3GfZaWrVBIkZQM+Yyz5fVbe+T+0e0E4cwAdw1APmFoWn/AApqrbgoMBPa9FdtNEDRWnODc4VipUJUo3EQrZlnunzVdYZ+apoEfm8F7XqA/eiI+l+jQBBdwWK52a8NUxE5KkKUSuAqoVDkNw05CSfck+KttK93hWQyWr1zoVOOPBWQ9BW5ytOK9LlSSoFMLebL7P1rbW6qgyTAJccmtHFztw9eC2Ww+xFW3uxk9XQBg1IzMahgOp56Dnou13HddGzt/DWUBrGRjdvnm7e4/fBZ8ueKcRzLVh8eb824hySt0e21lOtULWRRJB7Wb4AJNMR2hB3xvGohYrdircRi/Dugic3MGXdiXbrZRFVj2uJbTAgkGMR35ndGq9stYVKLXAQCMhyGWXJcJ8q8Q1fDo+erxuitQ/e0ns5nT/kJAXdNn7Ya1lo1XfE+m0u/ijP1lam/6YOokc1mbIWUUrK1jT2cVQgfpBcThHKZ813x5feOWbLh/wA54blERdHIREQEREBERAREQUV6oY0ucYA8fQaqK2s1LQ8nD2GSS1zoaInNzRJJGsfRSi1UA9had60VVr2stLWNl7mOc1uQkluAjPm2fFBxm9rSXuc4nNzi4+JlYIyEnVdLsPRg54DqtcN5MbP9RI9llVui+iNa9TyYPkufyMccbdPjZJ505HVMyrQXRLy2Ep0wcNVx7wPkoTel2mi4NxYpmMo05K9clbdOV8Vq9sMNXjRJhVljhqCO8FeOCuppSQvYheL0lSqBeuO9eL2UAuy714FSTJVxoRDxyzLku11prsot1cczwbvPl6wsFxXaOibZptOiLQ795UE9zToB7rllyeldu+HH720lFku/qqdOy0OyGNAJ/S3SZ3nXxW3s1CB1TMhq46nPeTvcVW+hgZhYO0466+LisR9bCeqpnE8++9zivN29eOuFF6jGzq2uw0WkCo6YOHUhvEn5ys1wGEARhgQBpG6FrLxp4osrTlrUcP0/mPInQd/JbF8BqraV4hHL8GRV/Zh37E8nu9gsW+3rI2W/cn+N3s1a/HYfKbhERa2MREQEREBERAREQFg26zwesG4OnuI+/NZyorfCe5RbpNe2RZvhHcsa3nIrMofCFhW/ReT9vZQ+9a8khRux3Z19qDcMwB6nP2C3N6/vFlbENH4moe72C0ROo2zWjc6bX/tqhhwFgPqtXX6MLNUMgFvJhgeWi6TSaI0VRGS5Re0dSma1niYcxHRTZhr1n/NWKnRDQd8Naq3vwu+S6eVUAp/2yfsnFj104tefRNUYP2VdruT2lv8AUCfZRy1bCW5n+ji5tc0+hIK+iXtWOaY4K9fKyR/VJ8THbrh8y2q5rRSk1KFRo4ljozy+KIWMWmMgT3Aldy6R6Q/D02xk6tTDhuIzyPELd2SysbTaAwAQMgF2+Xqu5hx+FHtqJcBuW4q1eqxvVVMBcMTsDsIbqc4gZe6+h7swUqbWtIyaBofkqqdIcFkMYOCzZc85GrDgjH/VTrWCDr3Rr4rW502Oc1pNV2pyyG5oJOn3wWzAVL2hcvZ31DX3RSLWlzvjcZcefDuGnnxWTaauSqBgFYVpKfaZlor4fK2uzA/8cc3O94+S0l6Fb7Zz/wBZn83/ANOW7x4ef5MtkiItTIIiICIiD//Z",
              },
              {
                subject: "Physics Mechanics",
                tutor: "Dr. Michael Chen",
                date: "Fri, Oct 16",
                time: "5:00 PM - 6:30 PM",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpSFN2Ey41bVaf-Yb6vRPbuUXrTCDciHXbA&s",
              },
            ].map((session, index) => (
              <Card key={index} className="group transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2 group-hover:bg-muted/40 transition-colors duration-200">
                  <CardTitle>{session.subject}</CardTitle>
                  <CardDescription>with {session.tutor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={session.image || "/placeholder.svg"}
                        alt={session.tutor}
                        width={40}
                        height={40}
                        className="rounded-full ring-2 ring-background"
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-background" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{session.date}</p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button size="sm" className="w-full transition-transform duration-200 hover:scale-[1.02]">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full hover:bg-muted/50 transition-all duration-200"
          >
            View All Sessions
          </Button>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Mathematics Fundamentals",
                progress: "75%",
                nextLesson: "Differential Equations",
                image: "https://img.freepik.com/free-vector/cartoon-maths-elements-background_52683-9162.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                title: "English Literature & Composition",
                progress: "50%",
                nextLesson: "Shakespeare's Sonnets",
                image: "https://img.freepik.com/premium-photo/close-up-books-table_1048944-11909417.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                title: "Physics Mechanics",
                progress: "30%",
                nextLesson: "Newton's Laws of Motion",
                image: "https://img.freepik.com/free-vector/physics-school-subject-concept-scientist-explore-electricity-magnetism-light-wave-forces-theoretical-practical-study-physics-lesson-experiment-isolated-vector-illustration_613284-1911.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
              {
                title: "Computer Science Principles",
                progress: "60%",
                nextLesson: "Data Structures",
                image: "https://img.freepik.com/free-vector/software-development-programming-coding-learning-information-technology-courses-it-courses-all-levels-computing-hi-tech-course-concept_335657-191.jpg?uid=R170200228&ga=GA1.1.2064536539.1745487729&semt=ais_hybrid&w=740",
              },
            ].map((course, index) => (
              <Card key={index} className="group overflow-hidden transition-all duration-200 hover:shadow-md">
                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={200}
                    height={100}
                    className="w-full object-cover h-32 transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>Progress: {course.progress}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-primary transition-all duration-500" 
                        style={{ width: course.progress }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Next lesson: {course.nextLesson}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full transition-colors duration-200 hover:bg-muted/50"
                    >
                      Materials
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full transition-transform duration-200 hover:scale-[1.02]"
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full hover:bg-muted/50 transition-all duration-200"
          >
            View All Courses
          </Button>
        </TabsContent>
        <TabsContent value="tutors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Dr. Sarah Johnson",
                subject: "Mathematics",
                rating: "4.9",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Prof. Emily Rodriguez",
                subject: "English Literature",
                rating: "4.8",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Dr. Michael Chen",
                subject: "Physics",
                rating: "4.9",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((tutor, index) => (
              <Card key={index} className="group transition-all duration-200 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/0 animate-pulse" />
                      <Image
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        width={80}
                        height={80}
                        className={cn(
                          "rounded-full aspect-square object-cover",
                          "ring-2 ring-background",
                          "transition-transform duration-200 group-hover:scale-105"
                        )}
                      />
                    </div>
                    <h3 className="text-lg font-bold">{tutor.name}</h3>
                    <p className="text-sm text-muted-foreground">{tutor.subject} Specialist</p>
                    <div className="flex items-center mt-2 space-x-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{tutor.rating}</span>
                    </div>
                    <div className="mt-4 flex space-x-2 w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full transition-colors duration-200 hover:bg-muted/50"
                      >
                        Message
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-full transition-transform duration-200 hover:scale-[1.02]"
                      >
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full hover:bg-muted/50 transition-all duration-200"
          >
            Find More Tutors
          </Button>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}