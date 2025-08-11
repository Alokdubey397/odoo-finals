"use client"

import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/layout/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Sports Facilities Instantly</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find and book basketball courts, tennis courts, football grounds, and more in your area.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Easy Booking</CardTitle>
              <CardDescription>Book your favorite sports facility in just a few clicks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Browse available venues, select your preferred time slot, and confirm your booking instantly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multiple Sports</CardTitle>
              <CardDescription>Wide variety of sports facilities available</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From badminton courts to football grounds, find the perfect venue for your sport.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>Safe and secure payment processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Pay securely online with multiple payment options and get instant confirmation.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          {!isAuthenticated ? (
            <div className="space-x-4">
              <Link href="/auth/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
