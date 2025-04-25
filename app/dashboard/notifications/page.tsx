'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card'
import { Bell } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"

export default function TutorNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tuteeId, setTuteeId] = useState<string | null>(null)

  useEffect(() => {
    // Get tuteeId from localStorage
    const userString = localStorage.getItem('user')
    if (userString) {
      try {
        const user = JSON.parse(userString)
        if (user && user._id) {
          setTuteeId(user._id)
        }
      } catch (err) {
        console.error('Failed to parse user from localStorage', err)
        setError('Failed to load user data')
        setLoading(false)
      }
    } else {
      setError('User not found in localStorage')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!tuteeId) return

    const fetchNotifications = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:8000/tutee-api/demo-class/booked/${tuteeId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch notifications')
        }
        const data = await response.json()
        setNotifications(data.payload || [])
      } catch (err: any) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [tuteeId])

  const filteredNotifications = notifications.filter((item) => item.meetLink)
  const unreadCount = filteredNotifications.length

  return (
    <DashboardShell>
      <DashboardHeader heading="Notifications" text={`You have ${unreadCount} unread notifications`}>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Mark All Read
        </Button>
      </DashboardHeader>

      <div className="space-y-4">
        {loading && (
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 dark:text-gray-400">Loading notifications...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardContent className="p-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 dark:text-gray-400">No notifications available.</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && filteredNotifications.map((item) => {
          const tutorName = `${item.tutorId.firstName} ${item.tutorId.lastName}`
          const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })

          return (
            <Card key={item._id} className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-5 space-y-2">
                <p className="text-sm text-muted-foreground">{timeAgo}</p>

                <h2 className="text-md font-medium">
                  📣 Booked demo classes
                </h2>

                <p className="text-gray-700 dark:text-gray-300">
                  👩‍🏫 <span className="font-medium">Tutor:</span> {tutorName}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  📘 <span className="font-medium">Subject:</span> {item.subject}
                </p>

                <p className="text-gray-700 dark:text-gray-300">
                  📅 <span className="font-medium">Date:</span> {new Date(item.finalDate).toLocaleDateString()}
                </p>

                {item.meetLink && (
                  <p className="text-blue-600 dark:text-blue-400">
                    🔗 <Link href={item.meetLink} target="_blank" className="underline">Join Meet</Link>
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}

        {!loading && !error && filteredNotifications.length > 0 && (
          <Button variant="outline" className="w-full">
            View All Notifications
          </Button>
        )}
      </div>
    </DashboardShell>
  )
}