import { ProgressTracker } from "@/components/tutor/progress-tracker"

export default function ProgressTrackerPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Tutee Progress Tracker</h1>
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <ProgressTracker />
      </div>
    </div>
  )
}
