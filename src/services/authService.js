// Mock authentication service
// In a real application, this would make API calls to your backend

// Helper to simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user data
const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    avatar: null,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "tutor",
    avatar: null,
  },
  {
    id: "3",
    firstName: "Admin",
    lastName: "User",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: null,
  },
]

// Local storage keys
const TOKEN_KEY = "auth_token"
const USER_KEY = "auth_user"

export const authService = {
  // Get current user from local storage
  getCurrentUser: async () => {
    await delay(500) // Simulate API delay

    const token = localStorage.getItem(TOKEN_KEY)
    const user = JSON.parse(localStorage.getItem(USER_KEY))

    if (token && user) {
      return user
    }

    return null
  },

  // Login user
  login: async (email, password, rememberMe = false) => {
    await delay(1000) // Simulate API delay

    // Find user by email (in a real app, this would be a server-side check)
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error("Invalid email or password")
    }

    // In a real app, password would be verified on the server
    // For demo purposes, we'll just assume the password is correct

    // Generate a mock token
    const token = `mock-jwt-token-${Date.now()}`

    // Store auth data
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      sessionStorage.setItem(TOKEN_KEY, token)
      sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    }

    return user
  },

  // Register new user
  register: async (userData) => {
    await delay(1500) // Simulate API delay

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === userData.email.toLowerCase())

    if (existingUser) {
      throw new Error("Email already in use")
    }

    // Create new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.role || "student",
      avatar: null,
    }

    // In a real app, this would be saved to the database
    mockUsers.push(newUser)

    // Generate a mock token
    const token = `mock-jwt-token-${Date.now()}`

    // Store auth data
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))

    return newUser
  },

  // Logout user
  logout: async () => {
    await delay(500) // Simulate API delay

    // Clear auth data
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
  },

  // Update user profile
  updateProfile: async (userData) => {
    await delay(1000) // Simulate API delay

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem(USER_KEY))

    if (!currentUser) {
      throw new Error("Not authenticated")
    }

    // Update user data
    const updatedUser = {
      ...currentUser,
      ...userData,
      name: `${userData.firstName || currentUser.firstName} ${userData.lastName || currentUser.lastName}`,
    }

    // In a real app, this would update the user in the database

    // Update local storage
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))

    return updatedUser
  },

  // Reset password
  resetPassword: async (email) => {
    await delay(1000) // Simulate API delay

    // Check if email exists
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      throw new Error("Email not found")
    }

    // In a real app, this would send a password reset email
    console.log(`Password reset email sent to ${email}`)
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    await delay(1000) // Simulate API delay

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem(USER_KEY))

    if (!currentUser) {
      throw new Error("Not authenticated")
    }

    // In a real app, this would verify the current password and update it
    console.log(`Password changed for user ${currentUser.email}`)
  },
}
