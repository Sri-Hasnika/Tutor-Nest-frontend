"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"

// Layouts
import MainLayout from "./components/layout/MainLayout"
import AuthLayout from "./components/layout/AuthLayout"
import AdminLayout from "./components/layout/AdminLayout"

// Pages
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"

// Auth Pages
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ResetPassword from "./pages/auth/ResetPassword"

// Course Pages
import CourseDetails from "./pages/courses/CourseDetails"
import CourseEdit from "./pages/courses/CourseEdit"
import CourseManagement from "./pages/courses/CourseManagement"
import NewCourse from "./pages/courses/NewCourse"

// Profile Pages
import ViewProfile from "./pages/profile/ViewProfile"
import EditProfile from "./pages/profile/EditProfile"

// Schedule Pages
import BookClass from "./pages/schedule/BookClass"
import ManageSchedule from "./pages/schedule/ManageSchedule"
import ScheduleOverview from "./pages/schedule/ScheduleOverview"

// Search Pages
import SearchResults from "./pages/search/SearchResults"

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard"
import ManageCourses from "./pages/admin/ManageCourses"
import ManageUsers from "./pages/admin/ManageUsers"
import Reports from "./pages/admin/Reports"

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path=":id" element={<CourseDetails />} />
        <Route path=":id/edit" element={<CourseEdit />} />
        <Route path="manage" element={<CourseManagement />} />
        <Route path="new" element={<NewCourse />} />
      </Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path=":id" element={<ViewProfile />} />
        <Route path="edit" element={<EditProfile />} />
      </Route>

      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ScheduleOverview />} />
        <Route path="book" element={<BookClass />} />
        <Route path="manage" element={<ManageSchedule />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
