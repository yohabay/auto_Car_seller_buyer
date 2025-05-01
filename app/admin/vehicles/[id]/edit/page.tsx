"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cars } from "@/lib/car-data"

export default function EditVehiclePage() {
  const params = useParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    condition: "",
    fuelType: "",
    transmission: "",
    exteriorColor: "",
    interiorColor: "",
    description: "",
  })

  useEffect(() => {
    // Simulate API fetch
    const fetchVehicle = async () => {
      setLoading(true)
      try {
        // Find the vehicle by ID
        const id = params.id as string
        const foundVehicle = cars.find((car) => car.id === Number.parseInt(id))

        if (!foundVehicle) {
          setError("Vehicle not found")
          return
        }

        // Set form data
        setVehicleInfo({
          make: foundVehicle.make,
          model: foundVehicle.model,
          year: foundVehicle.year.toString(),
          price: foundVehicle.price.toString(),
          mileage: foundVehicle.mileage.toString(),
          condition: foundVehicle.condition,
          fuelType: foundVehicle.fuelType,
          transmission: foundVehicle.transmission,
          exteriorColor: foundVehicle.exteriorColor || "",
          interiorColor: foundVehicle.interiorColor || "",
          description: foundVehicle.description || "",
        })
      } catch (err) {
        setError("Failed to load vehicle details")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setVehicleInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setVehicleInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Vehicle updated:", vehicleInfo)
    setIsSubmitting(false)

    // Redirect to vehicle details
    router.push(`/admin/vehicles/${params.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading vehicle details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Vehicle not found</h1>
          <p className="text-muted-foreground mb-8">
            The vehicle you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/admin?tab=vehicles">Back to Vehicles</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/vehicles/${params.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Vehicle Details
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Vehicle</h1>
              <p className="text-muted-foreground">Update vehicle information</p>
            </div>
            <Button className="gap-2" onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Edit the basic details of the vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Select
                      name="make"
                      value={vehicleInfo.make}
                      onValueChange={(value) => handleSelectChange("make", value)}
                    >
                      <SelectTrigger id="make">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Audi">Audi</SelectItem>
                        <SelectItem value="BMW">BMW</SelectItem>
                        <SelectItem value="Ford">Ford</SelectItem>
                        <SelectItem value="Honda">Honda</SelectItem>
                        <SelectItem value="Lexus">Lexus</SelectItem>
                        <SelectItem value="Mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="Porsche">Porsche</SelectItem>
                        <SelectItem value="Tesla">Tesla</SelectItem>
                        <SelectItem value="Toyota">Toyota</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="e.g. Model 3, X5, Civic"
                      value={vehicleInfo.model}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      name="year"
                      value={vehicleInfo.year}
                      onValueChange={(value) => handleSelectChange("year", value)}
                    >
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => 2023 - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="e.g. 25000"
                      value={vehicleInfo.price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      placeholder="e.g. 25000"
                      value={vehicleInfo.mileage}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <RadioGroup
                      value={vehicleInfo.condition}
                      onValueChange={(value) => handleSelectChange("condition", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="New" id="new" />
                        <Label htmlFor="new">New</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Used" id="used" />
                        <Label htmlFor="used">Used</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Certified" id="certified" />
                        <Label htmlFor="certified">Certified Pre-Owned</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
                <CardDescription>Edit additional vehicle specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Fuel Type</Label>
                    <RadioGroup
                      value={vehicleInfo.fuelType}
                      onValueChange={(value) => handleSelectChange("fuelType", value)}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Gasoline" id="gasoline" />
                          <Label htmlFor="gasoline">Gasoline</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Diesel" id="diesel" />
                          <Label htmlFor="diesel">Diesel</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Hybrid" id="hybrid" />
                          <Label htmlFor="hybrid">Hybrid</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Electric" id="electric" />
                          <Label htmlFor="electric">Electric</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Transmission</Label>
                    <RadioGroup
                      value={vehicleInfo.transmission}
                      onValueChange={(value) => handleSelectChange("transmission", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Automatic" id="automatic" />
                        <Label htmlFor="automatic">Automatic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Manual" id="manual" />
                        <Label htmlFor="manual">Manual</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exteriorColor">Exterior Color</Label>
                    <Input
                      id="exteriorColor"
                      name="exteriorColor"
                      placeholder="e.g. Midnight Silver"
                      value={vehicleInfo.exteriorColor}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interiorColor">Interior Color</Label>
                    <Input
                      id="interiorColor"
                      name="interiorColor"
                      placeholder="e.g. Black Leather"
                      value={vehicleInfo.interiorColor}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a detailed description of the vehicle..."
                    rows={6}
                    value={vehicleInfo.description}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Images</CardTitle>
                <CardDescription>Update vehicle images</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={`/placeholder.svg?height=200&width=300`}
                        alt="Main vehicle image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <span className="text-sm font-medium">Main Image</span>
                      <Button variant="outline" size="sm">
                        Replace
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={`/placeholder.svg?height=200&width=300`}
                        alt="Interior image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <span className="text-sm font-medium">Interior</span>
                      <Button variant="outline" size="sm">
                        Replace
                      </Button>
                    </div>
                  </div>

                  <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 bg-muted rounded-full p-3">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Add Image</h3>
                    <p className="text-xs text-muted-foreground mb-4">Upload additional images</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/admin/vehicles/${params.id}`}>Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
