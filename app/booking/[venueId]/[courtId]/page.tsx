"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, CreditCard, MapPin, Users } from "lucide-react"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  price: number
}

interface BookingDetails {
  venueId: string
  courtId: string
  date: Date | undefined
  timeSlot: TimeSlot | null
  totalPrice: number
}

const mockTimeSlots: TimeSlot[] = [
  { id: "1", time: "09:00 - 10:00", available: true, price: 600 },
  { id: "2", time: "10:00 - 11:00", available: true, price: 600 },
  { id: "3", time: "11:00 - 12:00", available: false, price: 600 },
  { id: "4", time: "12:00 - 13:00", available: true, price: 600 },
  { id: "5", time: "13:00 - 14:00", available: true, price: 600 },
  { id: "6", time: "14:00 - 15:00", available: true, price: 600 },
  { id: "7", time: "15:00 - 16:00", available: false, price: 600 },
  { id: "8", time: "16:00 - 17:00", available: true, price: 600 },
  { id: "9", time: "17:00 - 18:00", available: true, price: 700 },
  { id: "10", time: "18:00 - 19:00", available: true, price: 700 },
  { id: "11", time: "19:00 - 20:00", available: true, price: 700 },
  { id: "12", time: "20:00 - 21:00", available: true, price: 700 },
]

const mockVenueData = {
  name: "Elite Sports Complex",
  location: "Downtown, City Center",
  courtName: "Basketball Court A",
  sport: "Basketball",
  capacity: 10,
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    venueId: params.venueId as string,
    courtId: params.courtId as string,
    date: undefined,
    timeSlot: null,
    totalPrice: 0,
  })
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Date/Time, 2: Confirmation, 3: Payment

  useEffect(() => {
    if (!user || !user.isVerified) {
      router.push("/auth/login")
    }
  }, [user, router])

  const handleDateSelect = (date: Date | undefined) => {
    setBookingDetails((prev) => ({
      ...prev,
      date,
      timeSlot: null,
      totalPrice: 0,
    }))
  }

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setBookingDetails((prev) => ({
      ...prev,
      timeSlot,
      totalPrice: timeSlot.price,
    }))
  }

  const handleConfirmBooking = () => {
    if (bookingDetails.date && bookingDetails.timeSlot) {
      setStep(2)
    }
  }

  const handlePayment = async () => {
    setIsLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create booking record (in real app, this would call your API)
    const booking = {
      id: Date.now().toString(),
      userId: user?.id,
      venueId: bookingDetails.venueId,
      courtId: bookingDetails.courtId,
      venueName: mockVenueData.name,
      courtName: mockVenueData.courtName,
      date: bookingDetails.date,
      timeSlot: bookingDetails.timeSlot?.time,
      totalPrice: bookingDetails.totalPrice,
      status: "Confirmed",
      createdAt: new Date(),
    }

    // Store booking in localStorage (in real app, this would be in your database)
    const existingBookings = JSON.parse(localStorage.getItem("user_bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("user_bookings", JSON.stringify(existingBookings))

    setIsLoading(false)
    router.push("/user/bookings?success=true")
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 1 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Select Date & Time</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className={`flex items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 2 ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Confirm & Pay</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="space-y-6">
                {/* Venue Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {mockVenueData.name}
                    </CardTitle>
                    <CardDescription>
                      {mockVenueData.courtName} • {mockVenueData.sport} • Capacity: {mockVenueData.capacity} players
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{mockVenueData.location}</p>
                  </CardContent>
                </Card>

                {/* Date Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={bookingDetails.date}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                {/* Time Slot Selection */}
                {bookingDetails.date && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Select Time Slot
                      </CardTitle>
                      <CardDescription>Available slots for {bookingDetails.date.toDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot.id}
                            variant={bookingDetails.timeSlot?.id === slot.id ? "default" : "outline"}
                            disabled={!slot.available}
                            onClick={() => handleTimeSlotSelect(slot)}
                            className="h-auto p-3 flex flex-col items-center"
                          >
                            <span className="font-medium">{slot.time}</span>
                            <span className="text-sm">₹{slot.price}</span>
                          </Button>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-300 rounded"></div>
                          <span>Booked</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Details
                  </CardTitle>
                  <CardDescription>Complete your booking by making the payment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertDescription>
                        This is a demo payment. In a real application, you would integrate with a payment gateway like
                        Stripe or PayPal.
                      </AlertDescription>
                    </Alert>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Payment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Court booking fee:</span>
                          <span>₹{bookingDetails.totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service fee:</span>
                          <span>₹50</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>₹{bookingDetails.totalPrice + 50}</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handlePayment} className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Processing Payment..." : `Pay ₹${bookingDetails.totalPrice + 50}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{mockVenueData.name}</h4>
                  <p className="text-sm text-gray-600">{mockVenueData.location}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-gray-900">{mockVenueData.courtName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{mockVenueData.sport}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{mockVenueData.capacity} players</span>
                    </div>
                  </div>
                </div>

                {bookingDetails.date && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900">Date</h4>
                      <p className="text-sm text-gray-600">{bookingDetails.date.toDateString()}</p>
                    </div>
                  </>
                )}

                {bookingDetails.timeSlot && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900">Time</h4>
                      <p className="text-sm text-gray-600">{bookingDetails.timeSlot.time}</p>
                    </div>

                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="text-lg font-bold text-green-600">₹{bookingDetails.totalPrice}</span>
                    </div>
                  </>
                )}

                {step === 1 && bookingDetails.date && bookingDetails.timeSlot && (
                  <Button onClick={handleConfirmBooking} className="w-full">
                    Continue to Payment
                  </Button>
                )}

                {step === 2 && (
                  <Button onClick={() => setStep(1)} variant="outline" className="w-full">
                    Back to Selection
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
