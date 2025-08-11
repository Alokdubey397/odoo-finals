"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-600 mb-6">
              Sorry, we couldn't find the page you're looking for. The URL might be incorrect or the page may have been
              moved.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
            </Link>

            <Button variant="outline" className="w-full bg-transparent" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Visit our{" "}
              <Link href="/venues" className="text-blue-600 hover:text-blue-500">
                venues page
              </Link>{" "}
              or{" "}
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-500">
                dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
