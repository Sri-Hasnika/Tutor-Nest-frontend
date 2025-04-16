"use client"

import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { authService } from "../services/authService"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true)
        const userData = await authService.getCurrentUser()
        if (userData) {
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error("Failed to get current user:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      setIsLoading(true)
      setError(null)
      const userData = await authService.login(email, password, rememberMe)
      setUser(userData)
      setIsAuthenticated(true)
      return userData
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true)
      setError(null)
      const newUser = await authService.register(userData)
      setUser(newUser)
      setIsAuthenticated(true)
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true)
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      setError(err.message)
      console.error("Logout error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setIsLoading(true)
      setError(null)
      const updatedUser = await authService.updateProfile(userData)
      setUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      setIsLoading(true)
      setError(null)
      await authService.resetPassword(email)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setIsLoading(true)
      setError(null)
      await authService.changePassword(currentPassword, newPassword)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    changePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
