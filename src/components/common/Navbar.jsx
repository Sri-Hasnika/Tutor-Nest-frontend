"use client"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const Navbar = () => {
  const { isAuthenticated, user } = useAuth()

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "text-primary bg-primary bg-opacity-10" : "text-gray-700 hover:text-primary hover:bg-gray-100"
    }`

  return (
    <nav className="flex space-x-1">
      <NavLink to="/" className={navLinkClasses} end>
        Home
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/courses" className={navLinkClasses}>
            Courses
          </NavLink>
          <NavLink to="/schedule" className={navLinkClasses}>
            Schedule
          </NavLink>
          {user?.role === "tutor" && (
            <NavLink to="/my-students" className={navLinkClasses}>
              My Students
            </NavLink>
          )}
          {user?.role === "student" && (
            <NavLink to="/find-tutors" className={navLinkClasses}>
              Find Tutors
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClasses}>
              Admin
            </NavLink>
          )}
        </>
      ) : (
        <>
          <NavLink to="/courses" className={navLinkClasses}>
            Courses
          </NavLink>
          <NavLink to="/tutors" className={navLinkClasses}>
            Tutors
          </NavLink>
          <NavLink to="/how-it-works" className={navLinkClasses}>
            How It Works
          </NavLink>
          <NavLink to="/pricing" className={navLinkClasses}>
            Pricing
          </NavLink>
        </>
      )}

      <NavLink to="/about" className={navLinkClasses}>
        About
      </NavLink>
    </nav>
  )
}

export default Navbar
