'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Bell, Calendar, User, BookOpen } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { DashboardHeader } from "@/app/dashboard/dashboard-header"
import { DashboardShell } from "@/app/dashboard/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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
        const response = await fetch(`https://tutor-nest-backend.onrender.com/tutee-api/demo-class/booked/${tuteeId}`)
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
      <DashboardHeader 
        heading="Notifications" 
        text={unreadCount ? `You have ${unreadCount} unread notifications` : "No new notifications"}
      >
        <Button 
          variant="outline" 
          className="group transition-all hover:border-primary/30"
          disabled={unreadCount === 0}
        >
          <Bell className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Mark All Read
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {loading && (
          <Card>
            <CardContent className="p-6 flex justify-center items-center min-h-[200px]">
              <div className="flex flex-col items-center animate-in fade-in-0 zoom-in-50 duration-300">
                <div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
                <p className="text-muted-foreground">Loading notifications...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive/30">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-destructive/10 p-2 mt-0.5">
                  <Bell className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-medium text-destructive mb-1">Something went wrong</h3>
                  <p className="text-muted-foreground text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && !error && filteredNotifications.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-muted p-5 mb-5 animate-in zoom-in duration-300">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
              <p className="text-muted-foreground max-w-sm">
                Your demo class notifications will appear here once they're scheduled.
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && filteredNotifications.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotifications.map((notification) => {
                const tutorName = `${notification.tutorId.firstName} ${notification.tutorId.lastName}`
                const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
                const formattedDate = new Date(notification.finalDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                })

                return (
                  <Card key={notification._id} className="overflow-hidden transition-all duration-200 hover:shadow-md group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-muted/40 transition-colors duration-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-medium">Booked Demo Class</CardTitle>
                          <Badge variant="outline" className="text-xs font-normal">New</Badge>
                        </div>
                        <CardDescription>{timeAgo}</CardDescription>
                      </div>
                      <div className="rounded-full bg-primary/5 p-1.5 transition-transform duration-300 group-hover:scale-110">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 transition-all duration-200 hover:translate-x-1">
                          <div className="rounded-full bg-secondary/10 p-2">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-none">{tutorName}</p>
                            <p className="text-xs text-muted-foreground mt-1">Tutor</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 transition-all duration-200 hover:translate-x-1">
                          <div className="rounded-full bg-secondary/10 p-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-none">{notification.subject}</p>
                            <p className="text-xs text-muted-foreground mt-1">Subject</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 transition-all duration-200 hover:translate-x-1">
                          <div className="rounded-full bg-secondary/10 p-2">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium leading-none">{formattedDate}</p>
                            <p className="text-xs text-muted-foreground mt-1">Date</p>
                          </div>
                        </div>
                      </div>

                      {notification.meetLink && (
                        <div className="mt-6">
                          <Link 
                            href={notification.meetLink} 
                            target="_blank" 
                            className={cn(
                              "w-full inline-flex items-center justify-center rounded-md text-sm font-medium",
                              "h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90",
                              "transition-all duration-200 transform hover:scale-[1.02] hover:shadow-sm",
                              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            )}
                          >
                            Join Session
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Button 
              variant="outline" 
              className="w-full mt-2 hover:bg-muted/50 transition-all duration-200"
            >
              View All Notifications
            </Button>
          </>
        )}
      </div>
    </DashboardShell>
  )
}