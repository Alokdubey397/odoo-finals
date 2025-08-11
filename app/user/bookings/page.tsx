"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, X, CheckCircle } from "lucide-react"

interface Booking {
  id: string
  userId: string
  venueId: string
  courtId: string
  venueName: string
  courtName: string
  date: Date
  timeSlot: string
  totalPrice: number
  status: "Confirmed" | "Cancelled" | "Completed"
  createdAt: Date
}

export default function UserBookingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "user") {
      router.push("/auth/login")
      return
    }

    // Load bookings from localStorage (in real app, fetch from API)
    const storedBookings = JSON.parse(localStorage.getItem("user_bookings") || "[]")
    const userBookings = storedBookings
      .filter((booking: any) => booking.userId === user.id)
      .map((booking: any) => ({
        ...booking,
        date: new Date(booking.date),
        createdAt: new Date(booking.createdAt),
      }))
    setBookings(userBookings)

    // Check for success parameter
    if (searchParams.get("success") === "true") {
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 5000)
    }
  }, [user, router, searchParams])

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "Cancelled" as const } : booking,
    )
    setBookings(updatedBookings)

    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem("user_bookings") || "[]")
    const updatedAllBookings = allBookings.map((booking: any) =>
      booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking,
    )
    localStorage.setItem("user_bookings", JSON.stringify(updatedAllBookings))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const canCancelBooking = (booking: Booking) => {
    const bookingDateTime = new Date(booking.date)
    const now = new Date()
    return booking.status === "Confirmed" && bookingDateTime > now
  }

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "Confirmed" && new Date(booking.date) > new Date(),
  )

  const pastBookings = bookings.filter(
    (booking) => booking.status === "Completed" || new Date(booking.date) <= new Date(),
  )

  const cancelledBookings = bookings.filter((booking) => booking.status === "Cancelled")

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your sports facility bookings</p>
        </div>

        {/* Success Alert */}
        {showSuccessAlert && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Booking confirmed successfully! You can view your booking details below.
            </AlertDescription>
          </Alert>
        )}

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-4">
                    You don't have any upcoming bookings. Book a facility to get started!
                  </p>
                  <Button onClick={() => router.push("/")}>Browse Venues</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{booking.venueName}</CardTitle>
                          <CardDescription>{booking.courtName}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{booking.date.toDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-green-600">₹{booking.totalPrice}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Booked on {booking.createdAt.toLocaleDateString()}
                        </span>
                        {canCancelBooking(booking) && (
                          <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                            <X className="h-4 w-4 mr-1" />
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Past Bookings */}
          <TabsContent value="past">
            {pastBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No past bookings</h3>
                  <p className="text-gray-600">Your completed bookings will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {pastBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{booking.venueName}</CardTitle>
                          <CardDescription>{booking.courtName}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{booking.date.toDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-green-600">₹{booking.totalPrice}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Cancelled Bookings */}
          <TabsContent value="cancelled">
            {cancelledBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <X className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No cancelled bookings</h3>
                  <p className="text-gray-600">Your cancelled bookings will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {cancelledBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{booking.venueName}</CardTitle>
                          <CardDescription>{booking.courtName}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{booking.date.toDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{booking.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-red-600">Refunded: ₹{booking.totalPrice}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
