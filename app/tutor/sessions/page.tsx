// import { AvailabilityGrid } from "@/components/tutor/availability-grid"
// import { SessionTabs } from "@/components/tutor/session-tabs"
// import { Button } from "@/components/ui/button"
// import { CalendarDays } from "lucide-react"

// export default function SessionManagementPage() {
//   return (
//     <div className="container py-10">
//       <h1 className="text-3xl font-bold mb-6">Session Management</h1>

//       <div className="grid gap-8">
//         <div className="bg-white rounded-2xl p-6 shadow-md">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold">Weekly Availability</h2>
//             <Button variant="outline" className="flex items-center gap-2">
//               <CalendarDays className="h-4 w-4" />
//               <span>Sync Calendar</span>
//             </Button>
//           </div>
//           <AvailabilityGrid />
//         </div>

//         <div className="bg-white rounded-2xl p-6 shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Sessions</h2>
//           <SessionTabs />
//         </div>
//       </div>
//     </div>
//   )
// }
import { SessionManagement } from "@/components/tutor/session-management"

export default function SessionManagementPage() {
  return (
    <div className="container py-10">
      <SessionManagement />
    </div>
  )
}