"use client"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const MobileNavigation = ({ isAuthenticated }) => {
  const { user, logout } = useAuth()

  const navLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? "text-primary bg-primary bg-opacity-10" : "text-gray-700 hover:text-primary hover:bg-gray-100"
    }`

  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
            <NavLink to="/profile" className={navLinkClasses}>
              Profile
            </NavLink>
            <NavLink to="/settings" className={navLinkClasses}>
              Settings
            </NavLink>
            <button
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={logout}
            >
              Sign out
            </button>
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
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <Link
                  to="/auth/login"
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  Log In
                </Link>
              </div>
              <div className="mt-3 flex items-center px-3">
                <Link
                  to="/auth/register"
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

MobileNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

export default MobileNavigation
