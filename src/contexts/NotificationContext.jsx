"use client"

import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useAuth } from "../hooks/useAuth"

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isAuthenticated, user } = useAuth()

  // Fetch notifications when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchNotifications()
    } else {
      setNotifications([])
      setUnreadCount(0)
    }
  }, [isAuthenticated, user])

  // Mock function to fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // In a real app, this would be an API call
      // For now, we'll use mock data
      const mockNotifications = [
        {
          id: 1,
          type: "message",
          content: "New message from Dr. Sarah Johnson",
          time: new Date(Date.now() - 5 * 60000), // 5 minutes ago
          read: false,
          link: "/messages/1",
        },
        {
          id: 2,
          type: "schedule",
          content: "Your session with Prof. Michael Chen is starting in 30 minutes",
          time: new Date(Date.now() - 30 * 60000), // 30 minutes ago
          read: false,
          link: "/schedule",
        },
        {
          id: 3,
          type: "course",
          content: 'New material added to "Mathematics Fundamentals"',
          time: new Date(Date.now() - 2 * 3600000), // 2 hours ago
          read: true,
          link: "/courses/1",
        },
        {
          id: 4,
          type: "system",
          content: "Your account has been successfully updated",
          time: new Date(Date.now() - 1 * 86400000), // 1 day ago
          read: true,
          link: "/profile",
        },
        {
          id: 5,
          type: "payment",
          content: "Payment receipt for your recent session",
          time: new Date(Date.now() - 2 * 86400000), // 2 days ago
          read: true,
          link: "/payments",
        },
      ]

      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter((n) => !n.read).length)
    } catch (err) {
      setError(err.message || "Failed to fetch notifications")
      console.error("Error fetching notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      setIsLoading(true)
      setError(null)

      // In a real app, this would be an API call
      // For now, we'll update the state directly
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )

      // Update unread count
      setUnreadCount((prevCount) => Math.max(0, prevCount - 1))
    } catch (err) {
      setError(err.message || "Failed to mark notification as read")
      console.error("Error marking notification as read:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // In a real app, this would be an API call
      // For now, we'll update the state directly
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({ ...notification, read: true })),
      )

      // Update unread count
      setUnreadCount(0)
    } catch (err) {
      setError(err.message || "Failed to mark all notifications as read")
      console.error("Error marking all notifications as read:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Delete a notification
  const deleteNotification = async (notificationId) => {
    try {
      setIsLoading(true)
      setError(null)

      // In a real app, this would be an API call
      // For now, we'll update the state directly
      const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId)

      setNotifications(updatedNotifications)

      // Update unread count
      const newUnreadCount = updatedNotifications.filter((n) => !n.read).length
      setUnreadCount(newUnreadCount)
    } catch (err) {
      setError(err.message || "Failed to delete notification")
      console.error("Error deleting notification:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
