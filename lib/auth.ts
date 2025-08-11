import type { User, LoginCredentials, SignupData } from "./types"

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    email: "user@test.com",
    password: "password",
    name: "John Doe",
    role: "user",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "admin@test.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === credentials.email && u.password === credentials.password)

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const { password, ...userWithoutPassword } = user

    // Store in localStorage and set cookie for middleware
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))
      localStorage.setItem("auth_token", `token_${user.id}_${Date.now()}`)

      document.cookie = `auth_token=token_${user.id}_${Date.now()}; path=/; max-age=86400; SameSite=Lax`
    }

    return { success: true, user: userWithoutPassword }
  }

  static async signup(data: SignupData): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    // Add to mock users (in real app, this would be saved to database)
    mockUsers.push({ ...newUser, password: data.password })

    // Store in localStorage and set cookie
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(newUser))
      localStorage.setItem("auth_token", `token_${newUser.id}_${Date.now()}`)

      document.cookie = `auth_token=token_${newUser.id}_${Date.now()}; path=/; max-age=86400; SameSite=Lax`
    }

    return { success: true, user: newUser }
  }

  static logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_token")

      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
  }

  static getCurrentUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("auth_user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  static isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("auth_user")
      const token = localStorage.getItem("auth_token")
      return !!(user && token)
    }
    return false
  }
}
