"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X } from "lucide-react"

const defaultSubjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "History", "Geography", "Computer Science", "Economics",
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function TutorProfileForm() {
  const [userData, setUserData] = useState<any>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [availability, setAvailability] = useState<{ day: string; from: string; to: string }[]>([
    { day: "Monday", from: "09:00", to: "17:00" },
  ])
  const [newSubject, setNewSubject] = useState<string>("")

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUserData(parsedUser)
      setSelectedSubjects(parsedUser.subjectsToTeach || parsedUser.courseToTeach || [])
      setFirstName(parsedUser.firstName || "")
      setLastName(parsedUser.lastName || "")
    }
  }, [])

  const allSubjects = Array.from(new Set([...defaultSubjects, ...selectedSubjects]))

  const handleSubjectToggle = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
    } else {
      setSelectedSubjects([...selectedSubjects, subject])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
    }
  }

  const removeVideo = () => {
    setVideoPreview(null)
  }

  const addAvailability = () => {
    setAvailability([...availability, { day: "Monday", from: "09:00", to: "17:00" }])
  }

  const removeAvailability = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index))
  }

  const updateAvailability = (index: number, field: string, value: string) => {
    const updated = [...availability]
    updated[index] = { ...updated[index], [field]: value }
    setAvailability(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const tutorId = JSON.parse(localStorage.getItem("user") || "{}")._id
    if (!tutorId) return alert("Tutor ID not found")

    const payload = {
      firstName,
      lastName,
      qualification: (document.getElementById("qualifications") as HTMLInputElement).value,
      experience: Number((document.getElementById("experience") as HTMLInputElement).value),
      hourlyPrice: Number((document.getElementById("hourlyRate") as HTMLInputElement).value),
      AboutMe: (document.getElementById("bio") as HTMLTextAreaElement).value,
      subjectsToTeach: selectedSubjects,
    }

    try {
      const res = await fetch(`https://tutor-nest-backend.onrender.com/tutor-api/tutor/${tutorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Update failed")
      alert("Profile updated successfully!")
    } catch (err) {
      console.error(err)
      alert("Error updating profile")
    }
  }

  if (!userData) return null

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <Card className="p-6 rounded-2xl shadow-md">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="qualifications">Qualifications</Label>
              <Input id="qualifications" defaultValue={userData.qualification} />
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" min="0" defaultValue={userData.experience} />
            </div>

            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input id="hourlyRate" type="number" min="0" defaultValue={userData.hourlyPrice} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Subjects</Label>
              <div className="mt-2 grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
                {allSubjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subject-${subject}`}
                      checked={selectedSubjects.includes(subject)}
                      onCheckedChange={() => handleSubjectToggle(subject)}
                    />
                    <Label htmlFor={`subject-${subject}`} className="font-normal">
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add new subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  onClick={() => {
                    const trimmed = newSubject.trim()
                    if (trimmed && !selectedSubjects.includes(trimmed)) {
                      setSelectedSubjects([...selectedSubjects, trimmed])
                    }
                    setNewSubject("")
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue={userData.AboutMe}
              placeholder="Tell students about yourself, your teaching style, and experience..."
              className="h-32"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-medium mb-4">Availability</h3>

        <div className="space-y-4">
          {availability.map((slot, index) => (
            <div key={index} className="flex flex-wrap items-end gap-4">
              <div className="w-full sm:w-auto">
                <Label>Day</Label>
                <Select value={slot.day} onValueChange={(value) => updateAvailability(index, "day", value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto">
                <Label>From</Label>
                <Input
                  type="time"
                  value={slot.from}
                  onChange={(e) => updateAvailability(index, "from", e.target.value)}
                  className="w-full sm:w-[150px]"
                />
              </div>

              <div className="w-full sm:w-auto">
                <Label>To</Label>
                <Input
                  type="time"
                  value={slot.to}
                  onChange={(e) => updateAvailability(index, "to", e.target.value)}
                  className="w-full sm:w-[150px]"
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeAvailability(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addAvailability} className="mt-2">
            Add Time Slot
          </Button>
        </div>
      </Card>

      <Card className="p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-medium mb-4">Demo Video</h3>

        {videoPreview ? (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <video src={videoPreview} controls className="w-full h-full object-contain" />
            </div>
            <Button type="button" variant="destructive" onClick={removeVideo} className="w-full sm:w-auto">
              Remove Video
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Upload a short video introducing yourself and your teaching style
            </p>
            <Input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" id="video-upload" />
            <Label
              htmlFor="video-upload"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 cursor-pointer"
            >
              Upload Video
            </Label>
          </div>
        )}
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" className="px-8">
          Save Profile
        </Button>
      </div>
    </form>
  )
}
