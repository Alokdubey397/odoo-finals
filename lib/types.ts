export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin" | "owner"
  phone?: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  password: string
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

export interface Court {
  id: string
  name: string
  type: "Indoor" | "Outdoor"
  isAvailable: boolean
}

export interface Venue {
  id: string
  name: string
  sport: string
  description: string
  location: string
  pricePerHour: number
  rating: number
  totalReviews: number
  amenities: string[]
  images: string[]
  ownerId: string
  courts: Court[]
  operatingHours: {
    open: string
    close: string
  }
}

export interface Booking {
  id: string
  venueId: string
  courtId: string
  userId: string
  date: string
  timeSlot: string
  duration: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  createdAt: string
}

export interface VenueFilters {
  sport?: string
  location?: string
  priceRange?: [number, number]
  rating?: number
}

export interface BookingFormData {
  venueId: string
  courtId: string
  date: string
  timeSlot: string
  duration: number
}
