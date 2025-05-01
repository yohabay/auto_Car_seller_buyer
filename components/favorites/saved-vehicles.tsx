"use client"

import { useState, useEffect } from "react"
import { Heart, Trash2, Car, AlertCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { cars } from "@/lib/car-data"
import type { Car as CarType } from "@/lib/car-data"
import Link from "next/link"

interface SavedVehiclesProps {
  className?: string
}

export default function SavedVehicles({ className }: SavedVehiclesProps) {
  const [savedVehicles, setSavedVehicles] = useState<CarType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredVehicles, setFilteredVehicles] = useState<CarType[]>([])

  // Simulate loading saved vehicles from localStorage
  useEffect(() => {
    // In a real app, this would come from localStorage or a database
    // For demo purposes, we'll just use a few random cars
    const randomCars = [...cars].sort(() => 0.5 - Math.random()).slice(0, 4)

    setSavedVehicles(randomCars)
  }, [])

  // Filter vehicles based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVehicles(savedVehicles)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = savedVehicles.filter(
      (vehicle) =>
        vehicle.make.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        `${vehicle.year}`.includes(query) ||
        vehicle.condition.toLowerCase().includes(query),
    )

    setFilteredVehicles(filtered)
  }, [searchQuery, savedVehicles])

  const removeVehicle = (vehicleId: string) => {
    setSavedVehicles(savedVehicles.filter((v) => v.id !== vehicleId))
  }

  const clearAllVehicles = () => {
    setSavedVehicles([])
  }

  const getVehicleName = (vehicle: CarType) => {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Saved Vehicles
        </CardTitle>
        <CardDescription>Vehicles you've saved for later</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search saved vehicles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {savedVehicles.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllVehicles}>
              Clear All
            </Button>
          )}
        </div>

        {savedVehicles.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No saved vehicles</AlertTitle>
            <AlertDescription>
              Browse our inventory and click the heart icon to save vehicles you're interested in.
            </AlertDescription>
          </Alert>
        ) : filteredVehicles.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No matching vehicles</AlertTitle>
            <AlertDescription>No saved vehicles match your search query. Try a different search term.</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="border rounded-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={vehicle.images[0] || "/placeholder.svg"}
                    alt={getVehicleName(vehicle)}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() => removeVehicle(vehicle.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {vehicle.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-primary">
                      Save ${vehicle.discount.toLocaleString()}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{getVehicleName(vehicle)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.condition} • {vehicle.mileage.toLocaleString()} miles
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-bold">${vehicle.price.toLocaleString()}</p>
                    <Link href={`/cars/${vehicle.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/cars">
            <Car className="mr-2 h-4 w-4" />
            Browse More Vehicles
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
