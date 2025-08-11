"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
  allowedRoles?: string[]
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = "/auth/login",
  allowedRoles = [],
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Check authentication requirement
      if (requireAuth && !isAuthenticated) {
        // Store current URL for redirect after login
        const currentUrl = window.location.pathname + window.location.search
        const loginUrl = `${redirectTo}?returnUrl=${encodeURIComponent(currentUrl)}`
        router.push(loginUrl)
        return
      }

      // Check if user should be redirected away from auth pages
      if (!requireAuth && isAuthenticated) {
        const returnUrl = searchParams.get("returnUrl") || "/dashboard"
        router.push(returnUrl)
        return
      }

      // Check role-based access
      if (requireAuth && isAuthenticated && allowedRoles.length > 0) {
        if (!user || !allowedRoles.includes(user.role)) {
          router.push("/unauthorized")
          return
        }
      }

      setIsAuthorized(true)
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, allowedRoles, user, router, searchParams])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children until authorization is confirmed
  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
