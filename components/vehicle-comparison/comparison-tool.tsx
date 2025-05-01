"use client"

import { useState, useEffect } from "react"
import { Scale, Plus, X, Check, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { cars } from "@/lib/car-data"
import type { Car } from "@/lib/car-data"

interface ComparisonToolProps {
  initialVehicles?: string[]
  className?: string
}

export default function ComparisonTool({ initialVehicles = [], className }: ComparisonToolProps) {
  const [selectedVehicles, setSelectedVehicles] = useState<Car[]>([])
  const [availableVehicles, setAvailableVehicles] = useState<Car[]>([])
  const [newVehicleId, setNewVehicleId] = useState<string>("")
  const [comparisonResults, setComparisonResults] = useState<Record<string, any>>({})

  // Initialize with any provided vehicle IDs
  useEffect(() => {
    if (initialVehicles.length > 0) {
      const initialCars = cars.filter((car) => initialVehicles.includes(car.id))
      setSelectedVehicles(initialCars)
    }
    updateAvailableVehicles()
  }, [initialVehicles])

  // Update available vehicles whenever selected vehicles change
  useEffect(() => {
    updateAvailableVehicles()
    if (selectedVehicles.length >= 2) {
      generateComparisonResults()
    } else {
      setComparisonResults({})
    }
  }, [selectedVehicles])

  const updateAvailableVehicles = () => {
    const selectedIds = selectedVehicles.map((v) => v.id)
    setAvailableVehicles(cars.filter((car) => !selectedIds.includes(car.id)))
  }

  const addVehicle = () => {
    if (newVehicleId && selectedVehicles.length < 3) {
      const vehicleToAdd = cars.find((car) => car.id === newVehicleId)
      if (vehicleToAdd) {
        setSelectedVehicles([...selectedVehicles, vehicleToAdd])
        setNewVehicleId("")
      }
    }
  }

  const removeVehicle = (vehicleId: string) => {
    setSelectedVehicles(selectedVehicles.filter((v) => v.id !== vehicleId))
  }

  const generateComparisonResults = () => {
    // Generate comparison data between vehicles
    const results: Record<string, any> = {}

    // Price comparison
    const prices = selectedVehicles.map((v) => v.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    results.price = {
      winner: selectedVehicles.find((v) => v.price === minPrice)?.id,
      difference: maxPrice - minPrice,
      percentDifference: ((maxPrice - minPrice) / minPrice) * 100,
    }

    // Mileage comparison
    const mileages = selectedVehicles.map((v) => v.mileage)
    const minMileage = Math.min(...mileages)
    results.mileage = {
      winner: selectedVehicles.find((v) => v.mileage === minMileage)?.id,
      difference: Math.max(...mileages) - minMileage,
    }

    // Year comparison
    const years = selectedVehicles.map((v) => v.year)
    const maxYear = Math.max(...years)
    results.year = {
      winner: selectedVehicles.find((v) => v.year === maxYear)?.id,
      difference: maxYear - Math.min(...years),
    }

    // Features comparison
    const allFeatures = new Set<string>()
    selectedVehicles.forEach((v) => v.features.forEach((f) => allFeatures.add(f)))

    const featureComparison: Record<string, string[]> = {}
    selectedVehicles.forEach((v) => {
      featureComparison[v.id] = v.features
    })
    results.features = featureComparison

    // Unique features
    const uniqueFeatures: Record<string, string[]> = {}
    selectedVehicles.forEach((v) => {
      const otherVehicleFeatures = selectedVehicles
        .filter((other) => other.id !== v.id)
        .flatMap((other) => other.features)

      uniqueFeatures[v.id] = v.features.filter((f) => !otherVehicleFeatures.includes(f))
    })
    results.uniqueFeatures = uniqueFeatures

    setComparisonResults(results)
  }

  const getVehicleName = (vehicle: Car) => {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          Vehicle Comparison Tool
        </CardTitle>
        <CardDescription>Compare up to 3 vehicles side by side</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedVehicles.length === 0 ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No vehicles selected</AlertTitle>
            <AlertDescription>
              Add vehicles to the comparison to see detailed feature and specification differences.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedVehicles.map((vehicle) => (
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
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{getVehicleName(vehicle)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.condition} • {vehicle.mileage.toLocaleString()} miles
                  </p>
                  <p className="text-lg font-bold mt-2">${vehicle.price.toLocaleString()}</p>
                </div>
              </div>
            ))}

            {selectedVehicles.length < 3 && (
              <div className="border rounded-lg border-dashed flex flex-col items-center justify-center p-6 h-full">
                <div className="mb-4 bg-muted rounded-full p-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Add Vehicle</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Select a vehicle to add to your comparison
                </p>
                <div className="w-full space-y-2">
                  <Select value={newVehicleId} onValueChange={setNewVehicleId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {getVehicleName(vehicle)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full" disabled={!newVehicleId} onClick={addVehicle}>
                    Add to Comparison
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {Object.keys(comparisonResults).length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-medium">Comparison Results</h3>

            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 font-medium">Price Comparison</div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex flex-col items-center">
                        <span className="text-lg font-bold">${vehicle.price.toLocaleString()}</span>
                        {comparisonResults.price?.winner === vehicle.id && (
                          <Badge className="mt-1 bg-green-600">Best Price</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  {comparisonResults.price && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Price difference: ${comparisonResults.price.difference.toLocaleString()}(
                      {comparisonResults.price.percentDifference.toFixed(1)}%)
                    </p>
                  )}
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 font-medium">Year & Mileage</div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Year</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedVehicles.map((vehicle) => (
                          <div key={vehicle.id} className="flex flex-col items-center">
                            <span className="text-lg font-bold">{vehicle.year}</span>
                            {comparisonResults.year?.winner === vehicle.id && (
                              <Badge className="mt-1 bg-green-600">Newest</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Mileage</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedVehicles.map((vehicle) => (
                          <div key={vehicle.id} className="flex flex-col items-center">
                            <span className="text-lg font-bold">{vehicle.mileage.toLocaleString()}</span>
                            {comparisonResults.mileage?.winner === vehicle.id && (
                              <Badge className="mt-1 bg-green-600">Lowest</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 font-medium">Features Comparison</div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {selectedVehicles.map((vehicle) => (
                      <div key={vehicle.id}>
                        <h4 className="font-medium mb-2">{getVehicleName(vehicle)}</h4>
                        <div className="space-y-1">
                          {vehicle.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-600" />
                              <span>{feature}</span>
                              {comparisonResults.uniqueFeatures?.[vehicle.id]?.includes(feature) && (
                                <Badge variant="outline" className="ml-auto text-xs">
                                  Unique
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={selectedVehicles.length < 2}>
          Generate Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
