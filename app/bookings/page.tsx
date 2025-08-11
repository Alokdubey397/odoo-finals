"use client"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

const mockBookings = [
  {
    id: "1",
    venueName: "Elite Sports Complex",
    sport: "Badminton",
    courtName: "Court 1",
    date: "2024-01-15",
    timeSlot: "10:00 AM - 11:00 AM",
    location: "Koramangala, Bangalore",
    status: "confirmed",
    totalPrice: 800,
  },
  {
    id: "2",
    venueName: "Sports Arena Ahmedabad",
    sport: "Basketball",
    courtName: "Court A",
    date: "2024-01-18",
    timeSlot: "6:00 PM - 7:00 PM",
    location: "Satellite, Ahmedabad",
    status: "confirmed",
    totalPrice: 1200,
  },
  {
    id: "3",
    venueName: "Tennis Club Surat",
    sport: "Tennis",
    courtName: "Court 2",
    date: "2024-01-20",
    timeSlot: "8:00 AM - 9:00 AM",
    location: "Adajan, Surat",
    status: "pending",
    totalPrice: 1000,
  },
]

export default function BookingsPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600">Manage your sports facility bookings</p>
        </div>

        <div className="grid gap-6">
          {mockBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{booking.venueName}</CardTitle>
                    <p className="text-gray-600 mt-1">
                      {booking.courtName} - {booking.sport}
                    </p>
                  </div>
                  <Badge
                    variant={booking.status === "confirmed" ? "default" : "secondary"}
                    className={booking.status === "confirmed" ? "bg-green-100 text-green-800" : ""}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{booking.timeSlot}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{booking.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>₹{booking.totalPrice}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {booking.status === "confirmed" && (
                    <Button variant="destructive" size="sm">
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthGuard>
  )
}
