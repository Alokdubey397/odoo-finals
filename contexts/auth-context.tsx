"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { AuthContextType, User, LoginCredentials, SignupData } from "@/lib/types"
import { AuthService } from "@/lib/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    const result = await AuthService.login(credentials)

    if (result.success && result.user) {
      setUser(result.user)
    }

    setIsLoading(false)
    return result
  }

  const signup = async (data: SignupData) => {
    setIsLoading(true)
    const result = await AuthService.signup(data)

    if (result.success && result.user) {
      setUser(result.user)
    }

    setIsLoading(false)
    return result
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
