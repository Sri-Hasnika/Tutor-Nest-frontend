"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

// Mock data for demonstration
const tutees = [
  { id: 1, name: "Alex Johnson" },
  { id: 2, name: "Sarah Williams" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Emily Davis" },
]

const topics = [
  { id: 1, name: "Algebra Basics", completed: true },
  { id: 2, name: "Linear Equations", completed: true },
  { id: 3, name: "Quadratic Equations", completed: false },
  { id: 4, name: "Polynomials", completed: false },
  { id: 5, name: "Trigonometry", completed: false },
]

export function ProgressTracker() {
  const [selectedTutee, setSelectedTutee] = useState<string>("")
  const [topicsList, setTopicsList] = useState(topics)
  const [feedback, setFeedback] = useState("")
  const [reportFile, setReportFile] = useState<File | null>(null)
  const [newTopic, setNewTopic] = useState("")

  const handleTopicToggle = (topicId: number) => {
    setTopicsList(topicsList.map((topic) => (topic.id === topicId ? { ...topic, completed: !topic.completed } : topic)))
  }

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setTopicsList([...topicsList, { id: Date.now(), name: newTopic, completed: false }])
      setNewTopic("")
    }
  }

  const handleRemoveTopic = (topicId: number) => {
    setTopicsList(topicsList.filter((topic) => topic.id !== topicId))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReportFile(file)
    }
  }

  const removeFile = () => {
    setReportFile(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle submit logic
    console.log({
      tuteeId: selectedTutee,
      topics: topicsList,
      feedback,
      reportFile,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="tutee">Select Tutee</Label>
        <Select value={selectedTutee} onValueChange={setSelectedTutee}>
          <SelectTrigger id="tutee" className="w-full">
            <SelectValue placeholder="Select a tutee" />
          </SelectTrigger>
          <SelectContent>
            {tutees.map((tutee) => (
              <SelectItem key={tutee.id} value={tutee.id.toString()}>
                {tutee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTutee && (
        <>
          <Card className="p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-4">Completed Topics</h3>

            <div className="space-y-4">
              {topicsList.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`topic-${topic.id}`}
                      checked={topic.completed}
                      onCheckedChange={() => handleTopicToggle(topic.id)}
                    />
                    <Label
                      htmlFor={`topic-${topic.id}`}
                      className={`font-normal ${topic.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {topic.name}
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTopic(topic.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Input placeholder="Add new topic" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} />
              <Button type="button" onClick={handleAddTopic} disabled={!newTopic.trim()}>
                Add
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Provide feedback on the tutee's progress, strengths, and areas for improvement..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="h-32"
            />
          </div>

          <div className="space-y-4">
            <Label>Upload Assessment/Report</Label>

            {reportFile ? (
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-100 p-2 rounded">
                    <FileIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{reportFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(reportFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Upload assessment or report file</p>
                <Input type="file" onChange={handleFileUpload} className="hidden" id="report-upload" />
                <Label
                  htmlFor="report-upload"
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 cursor-pointer"
                >
                  Upload File
                </Label>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="px-8">
              Save Progress
            </Button>
          </div>
        </>
      )}
    </form>
  )
}

// Simple file icon component
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
