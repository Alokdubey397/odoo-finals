"use client"

import { Navigation } from "@/components/layout/navigation"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Clock, Users } from "lucide-react"

// Mock venues data
const mockVenues = [
  {
    id: "1",
    name: "Elite Sports Complex",
    sport: "Badminton",
    location: "Koramangala, Bangalore",
    pricePerHour: 800,
    rating: 4.8,
    reviews: 156,
    image: "/badminton-court.png",
    amenities: ["Parking", "Changing Room", "Water", "Equipment Rental"],
    availability: "Available",
  },
  {
    id: "2",
    name: "City Basketball Arena",
    sport: "Basketball",
    location: "Indiranagar, Bangalore",
    pricePerHour: 1200,
    rating: 4.6,
    reviews: 89,
    image: "/outdoor-basketball-court.png",
    amenities: ["Parking", "Changing Room", "Scoreboard"],
    availability: "Available",
  },
  {
    id: "3",
    name: "Green Valley Tennis Club",
    sport: "Tennis",
    location: "Whitefield, Bangalore",
    pricePerHour: 1500,
    rating: 4.9,
    reviews: 234,
    image: "/outdoor-tennis-court.png",
    amenities: ["Parking", "Pro Shop", "Coaching", "Refreshments"],
    availability: "Busy",
  },
  {
    id: "4",
    name: "Ahmedabad Sports Hub",
    sport: "Badminton",
    location: "Satellite, Ahmedabad",
    pricePerHour: 600,
    rating: 4.7,
    reviews: 98,
    image: "/badminton-court.png",
    amenities: ["Parking", "Changing Room", "Water", "AC"],
    availability: "Available",
  },
  {
    id: "5",
    name: "Gujarat Basketball Center",
    sport: "Basketball",
    location: "Vastrapur, Ahmedabad",
    pricePerHour: 900,
    rating: 4.5,
    reviews: 67,
    image: "/outdoor-basketball-court.png",
    amenities: ["Parking", "Changing Room", "Scoreboard", "Lighting"],
    availability: "Available",
  },
  {
    id: "6",
    name: "Surat Tennis Academy",
    sport: "Tennis",
    location: "Adajan, Surat",
    pricePerHour: 1100,
    rating: 4.6,
    reviews: 145,
    image: "/outdoor-tennis-court.png",
    amenities: ["Parking", "Pro Shop", "Coaching", "Equipment Rental"],
    availability: "Available",
  },
  {
    id: "7",
    name: "Vadodara Sports Complex",
    sport: "Football",
    location: "Alkapuri, Vadodara",
    pricePerHour: 1800,
    rating: 4.8,
    reviews: 203,
    image: "/football-field.png",
    amenities: ["Parking", "Changing Room", "Floodlights", "Refreshments"],
    availability: "Available",
  },
  {
    id: "8",
    name: "Rajkot Cricket Ground",
    sport: "Cricket",
    location: "University Road, Rajkot",
    pricePerHour: 2000,
    rating: 4.9,
    reviews: 312,
    image: "/cricket-ground.png",
    amenities: ["Parking", "Pavilion", "Equipment", "Scoreboard"],
    availability: "Busy",
  },
]

export default function VenuesPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports Venues</h1>
            <p className="text-gray-600">Find and book the perfect sports facility for your needs</p>
          </div>

          {/* Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input placeholder="Search venues..." />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="badminton">Badminton</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="cricket">Cricket</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="koramangala">Koramangala</SelectItem>
                <SelectItem value="indiranagar">Indiranagar</SelectItem>
                <SelectItem value="whitefield">Whitefield</SelectItem>
                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="vastrapur">Vastrapur</SelectItem>
                <SelectItem value="surat">Surat</SelectItem>
                <SelectItem value="adajan">Adajan</SelectItem>
                <SelectItem value="vadodara">Vadodara</SelectItem>
                <SelectItem value="alkapuri">Alkapuri</SelectItem>
                <SelectItem value="rajkot">Rajkot</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under ₹1000</SelectItem>
                <SelectItem value="medium">₹1000 - ₹1500</SelectItem>
                <SelectItem value="high">Above ₹1500</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVenues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      venue.availability === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {venue.availability}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{venue.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {venue.location}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{venue.sport}</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{venue.rating}</span>
                      <span className="text-sm text-gray-500">({venue.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">₹{venue.pricePerHour}</span>
                      <span className="text-sm text-gray-500">/hour</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {venue.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {venue.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{venue.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1" disabled={venue.availability === "Busy"}>
                      <Clock className="mr-2 h-4 w-4" />
                      {venue.availability === "Available" ? "Book Now" : "Fully Booked"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
