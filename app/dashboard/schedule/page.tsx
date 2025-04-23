// "use client"

// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Clock, Plus, Video } from "lucide-react"
// import Image from "next/image"
// import { DashboardHeader } from "../dashboard-header"
// import { DashboardShell } from "../dashboard-shell"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// const mockSessions = [
//   {
//     _id: "session1",
//     subject: "Mathematics - Algebra",
//     tuteeId: { name: "Alice Johnson" },
//     finalDate: new Date().setHours(10, 0, 0),
//     status: "accepted",
//     meetLink: "https://meet.google.com/abc-123",
//   },
//   {
//     _id: "session2",
//     subject: "Physics - Thermodynamics",
//     tuteeId: { name: "Bob Smith" },
//     finalDate: new Date().setHours(15, 30, 0),
//     status: "pending",
//     meetLink: "",
//   },
//   {
//     _id: "session3",
//     subject: "Chemistry - Organic Reactions",
//     tuteeId: { name: "Clara Davis" },
//     finalDate: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 0, 0),
//     status: "accepted",
//     meetLink: "https://meet.google.com/xyz-456",
//   },
//   {
//     _id: "session4",
//     subject: "Biology - Cell Division",
//     tuteeId: { name: "David Lee" },
//     finalDate: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(14, 0, 0),
//     status: "accepted",
//     meetLink: "https://meet.google.com/xyz-789",
//   },
//   {
//     _id: "session5",
//     subject: "English - Essay Writing",
//     tuteeId: { name: "Eva Watson" },
//     finalDate: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(11, 0, 0),
//     status: "rejected",
//     meetLink: "",
//   },
// ];

// export default function SchedulePage() {
//   const router = useRouter();
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

//   // Filter and sort sessions for selected date
//   const sessionsForSelectedDate = mockSessions
//     .filter(session => {
//       const sessionDate = new Date(session.finalDate).toDateString();
//       return selectedDate && sessionDate === selectedDate.toDateString();
//     })
//     .sort((a, b) => a.finalDate - b.finalDate);
  
//   return (
//     <DashboardShell>
//       <DashboardHeader heading="Schedule" text="Manage your upcoming sessions and book new ones">
//         <Button onClick={()=> router.push('/dashboard/find-tutors')}>
//           <Plus className="mr-2 h-4 w-4" />
//           Book Session
//         </Button>
//       </DashboardHeader>
//       <div className="grid gap-4 md:grid-cols-[1fr_300px]">
//       <Card className="col-span-1">
//           <CardHeader>
//             <CardTitle>Calendar</CardTitle>
//             <CardDescription>View and manage your scheduled sessions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Calendar
//               mode="single"
//               selected={selectedDate}
//               onSelect={setSelectedDate}
//               className="rounded-md border"
//             />
//             <h2 className="text-lg font-semibold mt-4">Sessions on {selectedDate?.toDateString()}</h2>
//             <div className="space-y-4 mt-2">
//               {sessionsForSelectedDate.length === 0 && (
//                 <p className="text-sm text-muted-foreground">No sessions scheduled on this date.</p>
//               )}
//               {sessionsForSelectedDate.map((session) => (
//                 <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
//                   <Image
//                     src={"/placeholder.svg?height=40&width=40"}
//                     alt={session.tuteeId.name}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <div className="flex-1 space-y-1">
//                     <p className="font-medium leading-none">{session.subject}</p>
//                     <p className="text-sm text-muted-foreground">with {session.tuteeId.name}</p>
//                     <div className="flex items-center pt-2">
//                       <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
//                       <span className="text-xs text-muted-foreground">
//                         {new Date(session.finalDate).toLocaleTimeString([], {
//                           hour: '2-digit',
//                           minute: '2-digit',
//                         })}
//                       </span>
//                     </div>
//                   </div>
//                   {session.status === 'accepted' && session.meetLink ? (
//                     <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
//                       <Button size="sm">
//                         <Video className="mr-1 h-3 w-3" />
//                         Join
//                       </Button>
//                     </a>
//                   ) : (
//                     <Button size="sm" disabled>
//                       {session.status === 'pending' ? 'Pending' : 'Unavailable'}
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//         <div className="space-y-4">
//           {/* <Card>
//             <CardHeader>
//               <CardTitle>Today's Sessions</CardTitle>
//               <CardDescription>{ Date()}</CardDescription> //*.split(' ').slice(0, 3).join(' ')
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {[
//                 {
//                   subject: "Physics Mechanics",
//                   tutor: "Dr. Michael Chen",
//                   time: "2:00 PM - 3:30 PM",
//                   image: "/placeholder.svg?height=40&width=40",
//                   status: "upcoming",
//                 },
//               ].map((session, index) => (
//                 <div key={index} className="flex items-start space-x-4 rounded-md border p-3">
//                   <Image
//                     src={session.image || "/placeholder.svg"}
//                     alt={session.tutor}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <div className="flex-1 space-y-1">
//                     <p className="font-medium leading-none">{session.subject}</p>
//                     <p className="text-sm text-muted-foreground">with {session.tutor}</p>
//                     <div className="flex items-center pt-2">
//                       <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
//                       <span className="text-xs text-muted-foreground">{session.time}</span>
//                     </div>
//                   </div>
//                   <Button size="sm">
//                     <Video className="mr-1 h-3 w-3" />
//                     Join
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card> */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Today's Sessions</CardTitle>
//               <CardDescription>{new Date().toDateString()}</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {[
//                 {
//                   _id: "session1",
//                   tuteeId: {
//                     _id: "tutee1",
//                     name: "Alice Johnson",
//                     email: "alice@example.com",
//                   },
//                   tutorId: "tutor1",
//                   subject: "Mathematics - Algebra",
//                   message: "Need help with quadratic equations.",
//                   status: "accepted",
//                   meetLink: "https://meet.google.com/ccp-rxvk-vdy",
//                   finalDate: new Date().toISOString(), // today's date
//                   createdAt: new Date().toISOString(),
//                 },
//                 {
//                   _id: "session2",
//                   tuteeId: {
//                     _id: "tutee2",
//                     name: "Bob Smith",
//                     email: "bob@example.com",
//                   },
//                   tutorId: "tutor2",
//                   subject: "Physics - Thermodynamics",
//                   message: "Revision before test.",
//                   status: "pending",
//                   meetLink: "",
//                   finalDate: new Date(new Date().setHours(15, 30, 0)).toISOString(), // today at 3:30 PM
//                   createdAt: new Date().toISOString(),
//                 },
//                 {
//                   _id: "session3",
//                   tuteeId: {
//                     _id: "tutee3",
//                     name: "Clara Davis",
//                     email: "clara@example.com",
//                   },
//                   tutorId: "tutor3",
//                   subject: "Chemistry - Organic Reactions",
//                   message: "Need explanation of SN1 and SN2.",
//                   status: "rejected",
//                   meetLink: "",
//                   finalDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), // yesterday
//                   createdAt: new Date().toISOString(),
//                 },
//               ]
//                 .filter((session) => {
//                   const today = new Date().toDateString();
//                   const sessionDate = session.finalDate ? new Date(session.finalDate).toDateString() : '';
//                   return today === sessionDate;
//                 })
//                 .map((session) => (
//                   <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
//                     <Image
//                       src={"/placeholder.svg?height=40&width=40"}
//                       alt={session.tuteeId?.name || "Session"}
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     />
//                     <div className="flex-1 space-y-1">
//                       <p className="font-medium leading-none">{session.subject}</p>
//                       <p className="text-sm text-muted-foreground">
//                         with {session.tuteeId?.name || "Tutee"}
//                       </p>
//                       {session.finalDate && (
//                         <div className="flex items-center pt-2">
//                           <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
//                           <span className="text-xs text-muted-foreground">
//                             {new Date(session.finalDate).toLocaleTimeString([], {
//                               hour: '2-digit',
//                               minute: '2-digit',
//                             })}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     {session.status === 'accepted' && session.meetLink ? (
//                       <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
//                         <Button size="sm">
//                           <Video className="mr-1 h-3 w-3" />
//                           Join
//                         </Button>
//                       </a>
//                     ) : (
//                       <Button size="sm" disabled>
//                         {session.status === 'pending' ? 'Pending' : 'Unavailable'}
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Upcoming Sessions</CardTitle>
//               <CardDescription>Next 7 days</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {[
//                 {
//                   subject: "Advanced Calculus",
//                   tutor: "Dr. Sarah Johnson",
//                   date: "Oct 12",
//                   time: "4:00 PM - 5:30 PM",
//                   image: "/placeholder.svg?height=40&width=40",
//                 },
//                 {
//                   subject: "English Literature",
//                   tutor: "Prof. Emily Rodriguez",
//                   date: "Oct 14",
//                   time: "3:00 PM - 4:00 PM",
//                   image: "/placeholder.svg?height=40&width=40",
//                 },
//               ].map((session, index) => (
//                 <div key={index} className="flex items-start space-x-4 rounded-md border p-3">
//                   <Image
//                     src={session.image || "/placeholder.svg"}
//                     alt={session.tutor}
//                     width={40}
//                     height={40}
//                     className="rounded-full"
//                   />
//                   <div className="flex-1 space-y-1">
//                     <p className="font-medium leading-none">{session.subject}</p>
//                     <p className="text-sm text-muted-foreground">with {session.tutor}</p>
//                     <div className="flex items-center pt-2">
//                       <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
//                       <span className="text-xs text-muted-foreground">
//                         {session.date}, {session.time}
//                       </span>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Reschedule
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <Tabs defaultValue="upcoming" className="space-y-4 mt-6">
//         <TabsList>
//           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//           <TabsTrigger value="past">Past Sessions</TabsTrigger>
//           {/* <TabsTrigger value="canceled">Canceled</TabsTrigger> */}
//         </TabsList>
//         <TabsContent value="upcoming" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {[
//               {
//                 subject: "Advanced Calculus",
//                 tutor: "Dr. Sarah Johnson",
//                 date: "Mon, Oct 12",
//                 time: "4:00 PM - 5:30 PM",
//                 image: "/placeholder.svg?height=40&width=40",
//               },
//               {
//                 subject: "English Literature",
//                 tutor: "Prof. Emily Rodriguez",
//                 date: "Wed, Oct 14",
//                 time: "3:00 PM - 4:00 PM",
//                 image: "/placeholder.svg?height=40&width=40",
//               },
//               {
//                 subject: "Physics Mechanics",
//                 tutor: "Dr. Michael Chen",
//                 date: "Fri, Oct 16",
//                 time: "5:00 PM - 6:30 PM",
//                 image: "/placeholder.svg?height=40&width=40",
//               },
//             ].map((session, index) => (
//               <Card key={index}>
//                 <CardHeader className="pb-2">
//                   <CardTitle>{session.subject}</CardTitle>
//                   <CardDescription>with {session.tutor}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-4">
//                     <Image
//                       src={session.image || "/placeholder.svg"}
//                       alt={session.tutor}
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     />
//                     <div className="space-y-1">
//                       <p className="text-sm font-medium leading-none">{session.date}</p>
//                       <p className="text-sm text-muted-foreground">{session.time}</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex space-x-2">
//                     <Button variant="outline" size="sm" className="w-full">
//                       Reschedule
//                     </Button>
//                     <Button size="sm" className="w-full">
//                       Join
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//         <TabsContent value="past" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {[
//               {
//                 subject: "Chemistry Basics",
//                 tutor: "Dr. Robert Lee",
//                 date: "Mon, Oct 5",
//                 time: "2:00 PM - 3:30 PM",
//                 image: "/placeholder.svg?height=40&width=40",
//               },
//               {
//                 subject: "Algebra Review",
//                 tutor: "Dr. Sarah Johnson",
//                 date: "Wed, Oct 7",
//                 time: "4:00 PM - 5:00 PM",
//                 image: "/placeholder.svg?height=40&width=40",
//               },
//             ].map((session, index) => (
//               <Card key={index}>
//                 <CardHeader className="pb-2">
//                   <CardTitle>{session.subject}</CardTitle>
//                   <CardDescription>with {session.tutor}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-4">
//                     <Image
//                       src={session.image || "/placeholder.svg"}
//                       alt={session.tutor}
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     />
//                     <div className="space-y-1">
//                       <p className="text-sm font-medium leading-none">{session.date}</p>
//                       <p className="text-sm text-muted-foreground">{session.time}</p>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex space-x-2">
//                     <Button variant="outline" size="sm" className="w-full">
//                       Recording
//                     </Button>
//                     <Button variant="outline" size="sm" className="w-full">
//                       Book Again
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//         {/* <TabsContent value="canceled" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {[
//               {
//                 subject: "Spanish Conversation",
//                 tutor: "Maria Gonzalez",
//                 date: "Fri, Oct 2",
//                 time: "1:00 PM - 2:00 PM",
//                 image: "/placeholder.svg?height=40&width=40",
//                 reason: "Tutor unavailable",
//               },
//             ].map((session, index) => (
//               <Card key={index}>
//                 <CardHeader className="pb-2">
//                   <div className="flex justify-between items-center">
//                     <CardTitle>{session.subject}</CardTitle>
//                     <div className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
//                       Canceled
//                     </div>
//                   </div>
//                   <CardDescription>with {session.tutor}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-4">
//                     <Image
//                       src={session.image || "/placeholder.svg"}
//                       alt={session.tutor}
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     />
//                     <div className="space-y-1">
//                       <p className="text-sm font-medium leading-none">{session.date}</p>
//                       <p className="text-sm text-muted-foreground">{session.time}</p>
//                     </div>
//                   </div>
//                   <div className="mt-2">
//                     <p className="text-sm text-muted-foreground">Reason: {session.reason}</p>
//                   </div>
//                   <div className="mt-4">
//                     <Button variant="outline" size="sm" className="w-full">
//                       Reschedule
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent> */}
//       </Tabs>
//     </DashboardShell>
//   )
// }

// // "use client"

// // import { useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Calendar } from "@/components/ui/calendar"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Clock, Plus, Video } from "lucide-react"
// // import Image from "next/image"
// // import { DashboardHeader } from "../dashboard-header"
// // import { DashboardShell } from "../dashboard-shell"
// // import { useRouter } from "next/navigation"

// // // Extended mock data
// // const mockSessions = [
// //   {
// //     _id: "session1",
// //     subject: "Mathematics - Algebra",
// //     tuteeId: { name: "Alice Johnson" },
// //     finalDate: new Date().setHours(10, 0, 0),
// //     status: "accepted",
// //     meetLink: "https://meet.google.com/abc-123",
// //   },
// //   {
// //     _id: "session2",
// //     subject: "Physics - Thermodynamics",
// //     tuteeId: { name: "Bob Smith" },
// //     finalDate: new Date().setHours(15, 30, 0),
// //     status: "pending",
// //     meetLink: "",
// //   },
// //   {
// //     _id: "session3",
// //     subject: "Chemistry - Organic Reactions",
// //     tuteeId: { name: "Clara Davis" },
// //     finalDate: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(9, 0, 0),
// //     status: "accepted",
// //     meetLink: "https://meet.google.com/xyz-456",
// //   },
// //   {
// //     _id: "session4",
// //     subject: "Biology - Cell Division",
// //     tuteeId: { name: "David Lee" },
// //     finalDate: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(14, 0, 0),
// //     status: "accepted",
// //     meetLink: "https://meet.google.com/xyz-789",
// //   },
// //   {
// //     _id: "session5",
// //     subject: "English - Essay Writing",
// //     tuteeId: { name: "Eva Watson" },
// //     finalDate: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(11, 0, 0),
// //     status: "rejected",
// //     meetLink: "",
// //   },
// // ];

// // export default function SchedulePage() {
// //   const router = useRouter();
//   // const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

//   // // Filter and sort sessions for selected date
//   // const sessionsForSelectedDate = mockSessions
//   //   .filter(session => {
//   //     const sessionDate = new Date(session.finalDate).toDateString();
//   //     return selectedDate && sessionDate === selectedDate.toDateString();
//   //   })
//   //   .sort((a, b) => a.finalDate - b.finalDate);

// //   return (
// //     <DashboardShell>
// //       <DashboardHeader heading="Schedule" text="Manage your upcoming sessions and book new ones">
// //         <Button onClick={() => router.push('/dashboard/find-tutors')}>
// //           <Plus className="mr-2 h-4 w-4" />
// //           Book Session
// //         </Button>
// //       </DashboardHeader>
// //       <div className="grid gap-4 md:grid-cols-[1fr_300px]">
// //         <Card className="col-span-1">
// //           <CardHeader>
// //             <CardTitle>Calendar</CardTitle>
// //             <CardDescription>View and manage your scheduled sessions</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <Calendar
// //               mode="single"
// //               selected={selectedDate}
// //               onSelect={setSelectedDate}
// //               className="rounded-md border"
// //             />
// //             <h2 className="text-lg font-semibold mt-4">Sessions on {selectedDate?.toDateString()}</h2>
// //             <div className="space-y-4 mt-2">
// //               {sessionsForSelectedDate.length === 0 && (
// //                 <p className="text-sm text-muted-foreground">No sessions scheduled on this date.</p>
// //               )}
// //               {sessionsForSelectedDate.map((session) => (
// //                 <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
// //                   <Image
// //                     src={"/placeholder.svg?height=40&width=40"}
// //                     alt={session.tuteeId.name}
// //                     width={40}
// //                     height={40}
// //                     className="rounded-full"
// //                   />
// //                   <div className="flex-1 space-y-1">
// //                     <p className="font-medium leading-none">{session.subject}</p>
// //                     <p className="text-sm text-muted-foreground">with {session.tuteeId.name}</p>
// //                     <div className="flex items-center pt-2">
// //                       <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
// //                       <span className="text-xs text-muted-foreground">
// //                         {new Date(session.finalDate).toLocaleTimeString([], {
// //                           hour: '2-digit',
// //                           minute: '2-digit',
// //                         })}
// //                       </span>
// //                     </div>
// //                   </div>
// //                   {session.status === 'accepted' && session.meetLink ? (
// //                     <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
// //                       <Button size="sm">
// //                         <Video className="mr-1 h-3 w-3" />
// //                         Join
// //                       </Button>
// //                     </a>
// //                   ) : (
// //                     <Button size="sm" disabled>
// //                       {session.status === 'pending' ? 'Pending' : 'Unavailable'}
// //                     </Button>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </DashboardShell>
// //   );
// // }

"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Plus, Video, VideoIcon } from "lucide-react"
import Image from "next/image"
import { DashboardHeader } from "../dashboard-header"
import { DashboardShell } from "../dashboard-shell"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SchedulePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const isSessionJoinable = (sessionDate:any) => {
    if (!sessionDate) return false;
    
    const now = new Date();
    const sessionTime = new Date(sessionDate);
    
    // Allow joining 15 minutes before the session and up to the session duration (assuming 1 hour sessions)
    const joinWindowStart = new Date(sessionTime);
    joinWindowStart.setMinutes(joinWindowStart.getMinutes() - 15);
    
    const joinWindowEnd = new Date(sessionTime);
    joinWindowEnd.setHours(joinWindowEnd.getHours() + 1);
    
    return now >= joinWindowStart && now <= joinWindowEnd;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        // Get tuteeID from localStorage
        const userString = localStorage.getItem("user");
        if (!userString) {
          console.error("User not found in localStorage");
          setIsLoading(false);
          return;
        }

        const user = JSON.parse(userString);
        const tuteeID = user._id;

        // Fetch sessions from the API
        const response = await fetch(`http://localhost:8000/tutee-api/demo-class/booked/${tuteeID}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        // Transform the API response data to match our expected format
        const formattedSessions = data.payload.map(session => ({
          _id: session._id,
          subject: session.subject,
          tuteeId: { name: `${user.firstName} ${user.lastName}` },
          tutorId: {
            name: session.tutorId ? `${session.tutorId.firstName} ${session.tutorId.lastName}` : "Unknown Tutor",
            image: session.tutorId?.profileImage || "/placeholder.svg?height=40&width=40"
          },
          finalDate: session.finalDate ? new Date(session.finalDate).getTime() : null,
          status: session.status,
          meetLink: session.meetLink || "",
          message: session.message,
          createdAt: session.createdAt
        }));

        setSessions(formattedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Filter and sort sessions for selected date
  const sessionsForSelectedDate = sessions
    .filter(session => {
      if (!session.finalDate || !selectedDate) return false;
      const sessionDate = new Date(session.finalDate).toDateString();
      return sessionDate === selectedDate.toDateString();
    })
    .sort((a, b) => a.finalDate - b.finalDate);
  
  // Filter today's sessions
  const todaySessions = sessions
    .filter(session => {
      if (!session.finalDate) return false;
      const today = new Date().toDateString();
      const sessionDate = new Date(session.finalDate).toDateString();
      return today === sessionDate;
    })
    .sort((a, b) => a.finalDate - b.finalDate);

  // Filter upcoming sessions (next 7 days, excluding today)
  const upcomingSessions = sessions
    .filter(session => {
      if (!session.finalDate) return false;
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      const sessionDate = new Date(session.finalDate);
      return sessionDate > today && sessionDate <= nextWeek && 
             sessionDate.toDateString() !== today.toDateString();
    })
    .sort((a, b) => a.finalDate - b.finalDate);

  return (
    <DashboardShell>
      <DashboardHeader heading="Schedule" text="Manage your upcoming sessions and book new ones">
        <Button onClick={()=> router.push('/dashboard/find-tutors')}>
          <Plus className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-[1fr_300px]">
      <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <h2 className="text-lg font-semibold mt-4">Sessions on {selectedDate?.toDateString()}</h2>
            <div className="space-y-4 mt-2">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading sessions...</p>
              ) : sessionsForSelectedDate.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sessions scheduled on this date.</p>
              ) : (
                sessionsForSelectedDate.map((session) => (
                  <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
                    <VideoIcon
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">with {session.tutorId.name}</p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(session.finalDate).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                    {session.meetLink ? (
                      isSessionJoinable(session.finalDate) ? (
                        <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                          <Button size="sm">
                            <Video className="mr-1 h-3 w-3" />
                            Join
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" disabled>
                          {new Date(session.finalDate) > new Date() ? 'Not Started' : 'Ended'}
                        </Button>
                      )
                    ) : (
                      <Button size="sm" disabled>
                        {session.status === 'pending' ? 'Pending' : 'No Link'}
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Sessions</CardTitle>
              <CardDescription>{new Date().toDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading sessions...</p>
              ) : todaySessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sessions scheduled for today.</p>
              ) : (
                todaySessions.map((session) => (
                  <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
                    <VideoIcon
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">with {session.tutorId.name}</p>
                      {session.finalDate && (
                        <div className="flex items-center pt-2">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(session.finalDate).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                    {session.meetLink ? (
                      isSessionJoinable(session.finalDate) ? (
                        <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                          <Button size="sm">
                            <Video className="mr-1 h-3 w-3" />
                            Join
                          </Button>
                        </a>
                      ) : (
                        <Button size="sm" disabled>
                          {new Date(session.finalDate) > new Date() ? 'Not Started' : 'Ended'}
                        </Button>
                      )
                    ) : (
                      <Button size="sm" disabled>
                        {session.status === 'pending' ? 'Pending' : 'No Link'}
                      </Button>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading sessions...</p>
              ) : upcomingSessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming sessions in the next 7 days.</p>
              ) : (
                upcomingSessions.map((session) => (
                  <div key={session._id} className="flex items-start space-x-4 rounded-md border p-3">
                    <VideoIcon
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">with {session.tutorId.name}</p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(session.finalDate).toLocaleDateString()}, {new Date(session.finalDate).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Tabs defaultValue="upcoming" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading sessions...</p>
            ) : upcomingSessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming sessions scheduled.</p>
            ) : (
              upcomingSessions.map((session) => (
                <Card key={session._id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{session.subject}</CardTitle>
                    <CardDescription>with {session.tutorId.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <VideoIcon
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {new Date(session.finalDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(session.finalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Reschedule
                      </Button>
                      {session.meetLink ? (
                        isSessionJoinable(session.finalDate) ? (
                          <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm">
                              <Video className="mr-1 h-3 w-3" />
                              Join
                            </Button>
                          </a>
                        ) : (
                          <Button size="sm" disabled>
                            {new Date(session.finalDate) > new Date() ? 'Not Started' : 'Ended'}
                          </Button>
                        )
                      ) : (
                        <Button size="sm" disabled>
                          {session.status === 'pending' ? 'Pending' : 'No Link'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading sessions...</p>
            ) : (
              sessions
                .filter(session => {
                  if (!session.finalDate) return false;
                  return new Date(session.finalDate) < new Date();
                })
                .map((session) => (
                  <Card key={session._id}>
                    <CardHeader className="pb-2">
                      <CardTitle>{session.subject}</CardTitle>
                      <CardDescription>with {session.tutorId.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <VideoIcon
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {new Date(session.finalDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.finalDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Recording
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Book Again
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}