"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Filter } from "lucide-react"

interface Venue {
  id: string
  name: string
  description: string
  location: string
  sports: string[]
  rating: number
  reviewCount: number
  priceRange: string
  image: string
  amenities: string[]
  venueType: string
}

const mockVenues: Venue[] = [
  {
    id: "1",
    name: "Elite Sports Complex",
    description: "Premium sports facility with state-of-the-art equipment",
    location: "Downtown, City Center",
    sports: ["Basketball", "Tennis", "Badminton"],
    rating: 4.8,
    reviewCount: 124,
    priceRange: "₹500-800/hour",
    image: "/modern-sports-complex.png",
    amenities: ["Parking", "Locker Rooms", "Cafeteria", "AC"],
    venueType: "Indoor",
  },
  {
    id: "2",
    name: "Sunshine Football Ground",
    description: "Large outdoor football field with natural grass",
    location: "Westside, Sports District",
    sports: ["Football", "Soccer"],
    rating: 4.5,
    reviewCount: 89,
    priceRange: "₹300-500/hour",
    image: "/football-field.png",
    amenities: ["Parking", "Changing Rooms", "Floodlights"],
    venueType: "Outdoor",
  },
  {
    id: "3",
    name: "AquaFit Swimming Center",
    description: "Olympic-size swimming pool with professional coaching",
    location: "Northside, Residential Area",
    sports: ["Swimming", "Water Polo"],
    rating: 4.7,
    reviewCount: 156,
    priceRange: "₹250-400/hour",
    image: "/outdoor-swimming-pool.png",
    amenities: ["Parking", "Locker Rooms", "Showers", "Pool Equipment"],
    venueType: "Indoor",
  },
  {
    id: "4",
    name: "Urban Cricket Academy",
    description: "Professional cricket ground with practice nets",
    location: "Eastside, Sports Hub",
    sports: ["Cricket"],
    rating: 4.6,
    reviewCount: 78,
    priceRange: "₹400-700/hour",
    image: "/cricket-ground.png",
    amenities: ["Parking", "Equipment Rental", "Coaching"],
    venueType: "Outdoor",
  },
  {
    id: "5",
    name: "Fitness First Gym",
    description: "Modern gym with cardio and strength training equipment",
    location: "Central, Business District",
    sports: ["Gym", "Fitness"],
    rating: 4.4,
    reviewCount: 203,
    priceRange: "₹200-350/hour",
    image: "/modern-gym.png",
    amenities: ["Parking", "Locker Rooms", "Personal Training", "AC"],
    venueType: "Indoor",
  },
  {
    id: "6",
    name: "Racquet Club Pro",
    description: "Premium tennis and squash courts with professional coaching",
    location: "Uptown, Elite District",
    sports: ["Tennis", "Squash"],
    rating: 4.9,
    reviewCount: 167,
    priceRange: "₹600-1000/hour",
    image: "/outdoor-tennis-court.png",
    amenities: ["Parking", "Pro Shop", "Coaching", "Restaurant"],
    venueType: "Indoor",
  },
]

export default function HomePage() {
  const [venues, setVenues] = useState<Venue[]>(mockVenues)
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>(mockVenues)
  const [searchTerm, setSearchTerm] = useState("")
  const [sportFilter, setSportFilter] = useState("allSports")
  const [venueTypeFilter, setVenueTypeFilter] = useState("allTypes")
  const [priceFilter, setPriceFilter] = useState("allPrices")
  const [ratingFilter, setRatingFilter] = useState("allRatings")
  const [currentPage, setCurrentPage] = useState(1)
  const venuesPerPage = 4

  useEffect(() => {
    let filtered = venues

    if (searchTerm) {
      filtered = filtered.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          venue.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (sportFilter !== "allSports") {
      filtered = filtered.filter((venue) =>
        venue.sports.some((sport) => sport.toLowerCase().includes(sportFilter.toLowerCase())),
      )
    }

    if (venueTypeFilter !== "allTypes") {
      filtered = filtered.filter((venue) => venue.venueType === venueTypeFilter)
    }

    if (priceFilter !== "allPrices") {
      let minPrice = 0
      let maxPrice = Number.POSITIVE_INFINITY
      if (priceFilter === "low") {
        maxPrice = 300
      } else if (priceFilter === "medium") {
        minPrice = 300
        maxPrice = 600
      } else if (priceFilter === "high") {
        minPrice = 600
      }
      filtered = filtered.filter((venue) => {
        const priceRange = venue.priceRange.replace(/₹/g, "").replace(/\//g, "").split("-").map(Number)
        return priceRange[0] >= minPrice && priceRange[1] <= maxPrice
      })
    }

    if (ratingFilter !== "allRatings") {
      const minRating = Number.parseFloat(ratingFilter)
      filtered = filtered.filter((venue) => venue.rating >= minRating)
    }

    setFilteredVenues(filtered)
    setCurrentPage(1)
  }, [searchTerm, sportFilter, venueTypeFilter, priceFilter, ratingFilter, venues])

  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage)
  const startIndex = (currentPage - 1) * venuesPerPage
  const currentVenues = filteredVenues.slice(startIndex, startIndex + venuesPerPage)

  const allSports = Array.from(new Set(venues.flatMap((venue) => venue.sports)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Book Your Perfect Sports Venue</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Find and book the best sports facilities in your area
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  placeholder="Search venues or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-white text-gray-900"
                />
                <Button size="lg" className="bg-blue-500 hover:bg-blue-400">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={sportFilter} onValueChange={setSportFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Sport Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allSports">All Sports</SelectItem>
                {allSports.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={venueTypeFilter} onValueChange={setVenueTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Venue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allTypes">All Types</SelectItem>
                <SelectItem value="Indoor">Indoor</SelectItem>
                <SelectItem value="Outdoor">Outdoor</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allPrices">All Prices</SelectItem>
                <SelectItem value="low">Under ₹300</SelectItem>
                <SelectItem value="medium">₹300 - ₹600</SelectItem>
                <SelectItem value="high">Above ₹600</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allRatings">All Ratings</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Popular Venues Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Venues ({filteredVenues.length} found)</h2>

          {currentVenues.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No venues found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {currentVenues.map((venue) => (
                <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={venue.image || "/placeholder.svg"}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600">{venue.venueType}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{venue.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{venue.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{venue.rating}</span>
                        <span className="text-sm text-gray-600">({venue.reviewCount})</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{venue.description}</CardDescription>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Sports Available:</p>
                        <div className="flex flex-wrap gap-1">
                          {venue.sports.map((sport) => (
                            <Badge key={sport} variant="secondary" className="text-xs">
                              {sport}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Amenities:</p>
                        <div className="flex flex-wrap gap-1">
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
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-semibold text-green-600">{venue.priceRange}</span>
                        </div>
                        <Link href={`/venue/${venue.id}`}>
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
