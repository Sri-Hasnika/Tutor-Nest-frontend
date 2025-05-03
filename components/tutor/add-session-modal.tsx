"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface AddSessionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (session: any) => void
  sessionPlans: any[]
}

export function AddSessionModal({ isOpen, onClose, onSubmit, sessionPlans }: AddSessionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [meetLink, setMeetLink] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [topics, setTopics] = useState<string[]>([])
  const [tutees, setTutees] = useState<any[]>([])
  const [selectedTutee, setSelectedTutee] = useState<string>("")
  const [step, setStep] = useState(1)

  // Fetch tutees for this tutor
  useEffect(() => {
    const fetchTutees = async () => {
      const tutor = JSON.parse(localStorage.getItem("user") || "{}");
      const tutorId = tutor?._id;

  
      if (!tutorId) return;
  
      try {
        const response = await fetch(`https://tutor-nest-backend.onrender.com/tutor-api/${tutorId}/tutees`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.payload.length>0) {
          setTutees(data.payload || []);
          console.log("Fetched tutees:", data.payload);
        }
      } catch (error) {
        console.error("Error fetching tutees:", error);
      }
    };
  
    fetchTutees();
  }, []);
  

  // Update topics when session plan changes
  useEffect(() => {
    if (!selectedPlan) {
      setTopics([])
      return
    }

    const plan = sessionPlans.find((p) => p._id === selectedPlan)
    if (plan && plan.topics) {
      setTopics(plan.topics)
    }
  }, [selectedPlan, sessionPlans])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const sessionData = {
      sessionPlanId: selectedPlan,
      title,
      topic,
      meetLink,
      scheduledTime: new Date(scheduledTime).toISOString(),
      tuteeId: selectedTutee,
    }

    onSubmit(sessionData)
    resetForm()
  }

  const resetForm = () => {
    setSelectedPlan("")
    setTitle("")
    setTopic("")
    setMeetLink("")
    setScheduledTime("")
    setSelectedTutee("")
    setStep(1)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const goToNextStep = () => {
    setStep(2)
  }

  const goToPreviousStep = () => {
    setStep(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Session</DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="sessionPlan">Select Session Plan</Label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger id="sessionPlan">
                    <SelectValue placeholder="Select a session plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionPlans.map((plan) => (
                      <SelectItem key={plan._id} value={plan._id}>
                        {plan.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tutee">Select Tutee</Label>
                <Select value={selectedTutee} onValueChange={setSelectedTutee}>
                  <SelectTrigger id="tutee">
                    <SelectValue placeholder="Select a tutee" />
                  </SelectTrigger>
                  <SelectContent>
                    {tutees.map((tutee) => (
                      <SelectItem key={tutee._id} value={tutee._id}>
                        {tutee.firstName} {tutee.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPlan && (() => {
              const plan = sessionPlans.find((p) => p._id === selectedPlan);
              if (!plan) return null;
              return (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium">Selected Plan Details</p>
                    <div className="text-sm text-muted-foreground mt-2 space-y-2">
                      <p><strong>Title:</strong> {plan.title || "N/A"}</p>
                      <p><strong>Status:</strong> {plan.status || "N/A"}</p>
                      <p><strong>Duration (weeks):</strong> {plan.durationWeeks ?? "N/A"}</p>
                      <p><strong>Additional Notes:</strong> {plan.additionalNotes || "N/A"}</p>
                      <div>
                        <strong>Schedule:</strong>
                        <p><strong>Days per Week:</strong> {plan.schedule?.daysPerWeek ?? "N/A"}</p>
                        <p><strong>Timings:</strong></p>
                        {plan.schedule?.timings && plan.schedule.timings.length > 0 ? (
                          <ul className="list-disc list-inside ml-5">
                            {plan.schedule.timings.map((time: string, index: number) => (
                              <li key={index}>{time}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No timings available</p>
                        )}
                      </div>
                      <div>
                        <strong>Topics:</strong>
                        {plan.topics && plan.topics.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {plan.topics.map((topic: string, index: number) => (
                              <li key={index}>{topic}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No topics available</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={goToNextStep} disabled={!selectedPlan || !selectedTutee}>
                Next
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Class Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter class title"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="topic">Topic Covered</Label>
                <Select value={topic} onValueChange={setTopic} required>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="meetLink">Meeting Link</Label>
                <Input
                  id="meetLink"
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  placeholder="Enter meeting link"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="scheduledTime">Scheduled Time</Label>
                <Input
                  id="scheduledTime"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={goToPreviousStep}>
                Back
              </Button>
              <Button type="submit">Create Session</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
