"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, LogOut } from "lucide-react"

export default function UnauthorizedPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-sm text-gray-600">You don't have permission to access this page.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Unauthorized Access</CardTitle>
            <CardDescription>
              Your current account doesn't have the required permissions to view this content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Current user:</span> {user.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Role:</span> {user.role}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout and Switch Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
