'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

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

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {loading && <p className="text-gray-500 dark:text-gray-400">Loading notifications...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && filteredNotifications.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No notifications available.</p>
      )}

      {!loading && !error && filteredNotifications.map((item) => {
        const tutorName = `${item.tutorId.firstName} ${item.tutorId.lastName}`
        const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })

        return (
          <Card key={item._id} className="mb-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <CardContent className="p-5 space-y-2">
              <p className="text-sm text-gray-400">{timeAgo}</p>

              <h2 className="text-md font-medium text-gray-800 dark:text-gray-200">
                📣 Booked demo classes
              </h2>

              <p className="text-gray-700 dark:text-gray-300">
                👩‍🏫 <span className="font-medium">Tutor:</span> {tutorName}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                📘 <span className="font-medium">Subject:</span> {item.subject}
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
    </div>
  )
}