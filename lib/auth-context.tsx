"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "user" | "facility_owner" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  isVerified: boolean
  isBanned?: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, role: UserRole, phone?: string) => Promise<boolean>
  logout: () => void
  verifyOTP: (otp: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("quickcourt_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock users for demo
    const mockUsers: User[] = [
      { id: "1", email: "user@test.com", name: "John User", role: "user", isVerified: true, createdAt: new Date() },
      {
        id: "2",
        email: "owner@test.com",
        name: "Jane Owner",
        role: "facility_owner",
        isVerified: true,
        createdAt: new Date(),
      },
      { id: "3", email: "admin@test.com", name: "Admin User", role: "admin", isVerified: true, createdAt: new Date() },
    ]

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password") {
      setUser(foundUser)
      localStorage.setItem("quickcourt_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    phone?: string,
  ): Promise<boolean> => {
    setIsLoading(true)

    // Mock signup
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      phone,
      isVerified: false,
      createdAt: new Date(),
    }

    setUser(newUser)
    localStorage.setItem("quickcourt_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // Mock OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (otp === "123456" && user) {
      const verifiedUser = { ...user, isVerified: true }
      setUser(verifiedUser)
      localStorage.setItem("quickcourt_user", JSON.stringify(verifiedUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("quickcourt_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, verifyOTP, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
