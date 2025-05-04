"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Mock data for demonstration
const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"]

export function PricingForm() {
  const [useGeneralRate, setUseGeneralRate] = useState(true)
  const [generalRate, setGeneralRate] = useState("25")
  const [subjectRates, setSubjectRates] = useState<Record<string, string>>(
    subjects.reduce((acc, subject) => ({ ...acc, [subject]: "25" }), {}),
  )

  const handleSubjectRateChange = (subject: string, value: string) => {
    setSubjectRates((prev) => ({
      ...prev,
      [subject]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle submit logic
    console.log({
      useGeneralRate,
      generalRate,
      subjectRates,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-base font-medium">General Hourly Rate</h3>
          <p className="text-sm text-muted-foreground">Apply the same rate to all subjects</p>
        </div>
        <Switch checked={useGeneralRate} onCheckedChange={setUseGeneralRate} />
      </div>

      {useGeneralRate ? (
        <div className="space-y-2">
          <Label htmlFor="generalRate">Hourly Rate ($)</Label>
          <div className="flex">
            <Input
              id="generalRate"
              type="number"
              min="0"
              value={generalRate}
              onChange={(e) => setGeneralRate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Separator />
          <h3 className="text-base font-medium">Subject-specific Rates</h3>

          {subjects?.map((subject) => (
            <div key={subject} className="grid grid-cols-2 gap-4 items-center">
              <Label htmlFor={`rate-${subject}`}>{subject}</Label>
              <div className="flex items-center">
                <span className="mr-2">$</span>
                <Input
                  id={`rate-${subject}`}
                  type="number"
                  min="0"
                  value={subjectRates[subject]}
                  onChange={(e) => handleSubjectRateChange(subject, e.target.value)}
                />
                <span className="ml-2">/hr</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button type="submit" className="w-full">
        Save Pricing
      </Button>
    </form>
  )
}
