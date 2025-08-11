"use client"

import { useAuth } from "@/contexts/auth-context"
import { Navigation } from "@/components/layout/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, User, Settings, LogOut, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockBookings = [
  {
    id: "1",
    venueName: "Elite Sports Complex",
    sport: "Badminton",
    date: "2024-01-15",
    time: "10:00 AM - 11:00 AM",
    status: "confirmed",
    location: "Koramangala, Bangalore",
  },
  {
    id: "2",
    venueName: "City Basketball Court",
    sport: "Basketball",
    date: "2024-01-18",
    time: "6:00 PM - 7:00 PM",
    status: "pending",
    location: "Indiranagar, Bangalore",
  },
  {
    id: "3",
    venueName: "Green Valley Tennis",
    sport: "Tennis",
    date: "2024-01-12",
    time: "8:00 AM - 9:00 AM",
    status: "completed",
    location: "Whitefield, Bangalore",
  },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                    {user ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge variant="secondary" className="mt-1">
                    {user?.role === "admin" ? "Administrator" : "User"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Link href="/profile">
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 bg-transparent"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next 7 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorite Sport</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Badminton</div>
                <p className="text-xs text-muted-foreground">5 bookings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹8,400</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>Your latest sports facility bookings</CardDescription>
                    </div>
                    <Link href="/venues">
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Booking
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.map((booking, index) => (
                      <div key={booking.id}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div>
                              <p className="font-medium">{booking.venueName}</p>
                              <p className="text-sm text-gray-600">{booking.sport}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{booking.date}</p>
                            <p className="text-sm text-gray-600">{booking.time}</p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1 ml-6">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.location}
                        </div>
                        {index < mockBookings.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/venues">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Book a Venue
                    </Button>
                  </Link>
                  <Link href="/bookings">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      View All Bookings
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Separator />
                  <Button
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                    variant="outline"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member since</span>
                    <span className="text-sm font-medium">Jan 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Account type</span>
                    <span className="text-sm font-medium capitalize">{user?.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
