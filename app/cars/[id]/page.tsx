"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Fuel, Gauge, Users, CarIcon, Shield, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cars } from "@/lib/car-data"
import CarImageGallery from "@/components/car-image-gallery"
import RelatedCars from "@/components/related-cars"
import TestDriveModal from "@/components/car-detail/test-drive-modal"
import ContactSellerModal from "@/components/car-detail/contact-seller-modal"
import FinanceOptionsModal from "@/components/car-detail/finance-options-modal"
import LoginModal from "@/components/auth/login-modal"
import SignupModal from "@/components/auth/signup-modal"
import EnhancedFooter from "@/components/footer/enhanced-footer"

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === params.id) || cars[0]
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false)
  const [isContactSellerOpen, setIsContactSellerOpen] = useState(false)
  const [isFinanceOptionsOpen, setIsFinanceOptionsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const carName = `${car.year} ${car.make} ${car.model}`

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/cars">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Listings
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {car.make} {car.model}
                </h1>
                <Badge variant="outline" className="text-primary">
                  {car.condition}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {car.year} • {car.location}
              </p>
            </div>

            <CarImageGallery images={car.images} />

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium">{car.year}</span>
                <span className="text-xs text-muted-foreground">Year</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Gauge className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium">{car.mileage.toLocaleString()} mi</span>
                <span className="text-xs text-muted-foreground">Mileage</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Fuel className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium">{car.fuelType}</span>
                <span className="text-xs text-muted-foreground">Fuel Type</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <Users className="h-5 w-5 text-primary mb-2" />
                <span className="text-sm font-medium">{car.seats}</span>
                <span className="text-xs text-muted-foreground">Seats</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground">{car.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl font-bold">${car.price.toLocaleString()}</span>
                  {car.discount > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm line-through text-muted-foreground">
                        ${(car.price + car.discount).toLocaleString()}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        Save ${car.discount.toLocaleString()}
                      </Badge>
                    </div>
                  )}
                </div>
                <Tag className="h-6 w-6 text-primary" />
              </div>

              <div className="space-y-4">
                <Button className="w-full gap-2" onClick={() => setIsTestDriveOpen(true)}>
                  <CarIcon className="h-4 w-4" />
                  Schedule Test Drive
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setIsContactSellerOpen(true)}>
                  Contact Seller
                </Button>
                <Button variant="secondary" className="w-full" onClick={() => setIsFinanceOptionsOpen(true)}>
                  Finance Options
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">AI Price Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on market data, this price is <span className="text-green-600 font-medium">3.2% below</span>{" "}
                  similar vehicles in your area.
                </p>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Great Deal</span>
                  <span>Fair Price</span>
                  <span>Overpriced</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
          <RelatedCars currentCarId={car.id} />
        </div>
      </main>

      {/* Enhanced Footer with Map */}
      <EnhancedFooter />

      {/* Modals */}
      <TestDriveModal isOpen={isTestDriveOpen} onClose={() => setIsTestDriveOpen(false)} carName={carName} />
      <ContactSellerModal
        isOpen={isContactSellerOpen}
        onClose={() => setIsContactSellerOpen(false)}
        carName={carName}
      />
      <FinanceOptionsModal
        isOpen={isFinanceOptionsOpen}
        onClose={() => setIsFinanceOptionsOpen(false)}
        carName={carName}
        carPrice={car.price}
      />
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
