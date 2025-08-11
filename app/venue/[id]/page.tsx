"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Wifi, Car, Coffee, Users, Calendar } from "lucide-react"

interface Court {
  id: string
  name: string
  sport: string
  pricePerHour: number
  capacity: number
  amenities: string[]
}

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
}

interface Venue {
  id: string
  name: string
  description: string
  location: string
  address: string
  sports: string[]
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  venueType: string
  operatingHours: string
  courts: Court[]
  reviews: Review[]
}

const mockVenue: Venue = {
  id: "1",
  name: "Elite Sports Complex",
  description:
    "Premium sports facility with state-of-the-art equipment and professional-grade courts. Perfect for both casual players and serious athletes.",
  location: "Downtown, City Center",
  address: "123 Sports Avenue, Downtown, City 12345",
  sports: ["Basketball", "Tennis", "Badminton"],
  rating: 4.8,
  reviewCount: 124,
  images: [
    "/indoor-basketball-court.png",
    "/indoor-tennis-court.png",
    "/indoor-badminton-court.png",
    "/sports-facility-lobby.png",
  ],
  amenities: ["Parking", "Locker Rooms", "Cafeteria", "AC", "WiFi", "Equipment Rental", "Showers"],
  venueType: "Indoor",
  operatingHours: "6:00 AM - 11:00 PM",
  courts: [
    {
      id: "court-1",
      name: "Basketball Court A",
      sport: "Basketball",
      pricePerHour: 600,
      capacity: 10,
      amenities: ["Scoreboard", "Sound System", "AC"],
    },
    {
      id: "court-2",
      name: "Tennis Court 1",
      sport: "Tennis",
      pricePerHour: 500,
      capacity: 4,
      amenities: ["Net", "Lighting", "AC"],
    },
    {
      id: "court-3",
      name: "Badminton Court 1",
      sport: "Badminton",
      pricePerHour: 400,
      capacity: 4,
      amenities: ["Net", "Shuttlecocks", "AC"],
    },
  ],
  reviews: [
    {
      id: "1",
      userName: "John Smith",
      rating: 5,
      comment: "Excellent facilities! The courts are well-maintained and the staff is very helpful.",
      date: "2024-01-15",
    },
    {
      id: "2",
      userName: "Sarah Johnson",
      rating: 4,
      comment: "Great place to play tennis. The booking system is easy to use.",
      date: "2024-01-10",
    },
    {
      id: "3",
      userName: "Mike Wilson",
      rating: 5,
      comment: "Love the basketball court here. Always clean and equipment is top-notch.",
      date: "2024-01-08",
    },
  ],
}

export default function VenueDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [venue, setVenue] = useState<Venue | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null)

  useEffect(() => {
    // In a real app, fetch venue data based on params.id
    setVenue(mockVenue)
  }, [params.id])

  const handleBookNow = (court: Court) => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!user.isVerified) {
      router.push("/auth/verify-otp")
      return
    }

    setSelectedCourt(court)
    router.push(`/booking/${venue?.id}/${court.id}`)
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "parking":
        return <Car className="h-4 w-4" />
      case "cafeteria":
      case "restaurant":
        return <Coffee className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading venue details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery */}
            <div className="lg:w-2/3">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={venue.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {venue.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? "border-blue-600" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Venue Info */}
            <div className="lg:w-1/3">
              <div className="sticky top-8">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-600">{venue.venueType}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{venue.rating}</span>
                    <span className="text-sm text-gray-600">({venue.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{venue.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{venue.address}</span>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">Open: {venue.operatingHours}</span>
                </div>

                <p className="text-gray-700 mb-6">{venue.description}</p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sports Available</h3>
                    <div className="flex flex-wrap gap-2">
                      {venue.sports.map((sport) => (
                        <Badge key={sport} variant="secondary">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {venue.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          {getAmenityIcon(amenity)}
                          <span className="text-sm text-gray-600">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="courts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courts">Courts & Booking</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Courts Tab */}
          <TabsContent value="courts">
            <div className="grid gap-6">
              {venue.courts.map((court) => (
                <Card key={court.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{court.name}</CardTitle>
                        <CardDescription>
                          {court.sport} • Capacity: {court.capacity} players
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">₹{court.pricePerHour}/hour</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Court Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {court.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button onClick={() => handleBookNow(court)} className="w-full sm:w-auto">
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {venue.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {review.userName.charAt(0)}
                          </div>
                          <span className="font-medium">{review.userName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
