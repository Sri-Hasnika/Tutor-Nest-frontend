"use client"

import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProfileAvatar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        {user?.avatar ? (
          <img className="h-8 w-8 rounded-full object-cover" src={user.avatar || "/placeholder.svg"} alt={user.name} />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
            {getInitials(user?.name || "User")}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "User"}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email || "user@example.com"}</p>
          </div>
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

ProfileAvatar.propTypes = {
  user: PropTypes.object,
}

export default ProfileAvatar
