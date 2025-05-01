"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import CarListingCard from "@/components/car-listing-card"
import CarFilters from "@/components/car-filters"
import { cars } from "@/lib/car-data"
import LoginModal from "@/components/auth/login-modal"
import SignupModal from "@/components/auth/signup-modal"
import EnhancedFooter from "@/components/footer/enhanced-footer"

export default function CarsPage() {
  const [filteredCars, setFilteredCars] = useState(cars)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => setIsLoginOpen(true)}>
              Log In
            </Button>
            <Button size="sm" onClick={() => setIsSignupOpen(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 flex-1">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Find Your Perfect Car</h1>
            <p className="text-muted-foreground">Browse our selection of premium vehicles</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CarFilters onFilterChange={setFilteredCars} />
            </div>
            <div className="lg:col-span-3">
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarListingCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <h3 className="text-xl font-bold mb-2">No cars match your filters</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                  <Button variant="outline" onClick={() => setFilteredCars(cars)}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer with Map */}
      <EnhancedFooter />

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenSignup={() => setIsSignupOpen(true)}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </div>
  )
}
