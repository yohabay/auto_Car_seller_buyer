"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AddVehiclePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "2023",
    price: "",
    mileage: "",
    condition: "New",
    fuelType: "Gasoline",
    transmission: "Automatic",
    exteriorColor: "",
    interiorColor: "",
    description: "",
  })

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

    console.log("Vehicle created:", vehicleInfo)
    setIsSubmitting(false)

    // Redirect to vehicles list
    router.push("/admin?tab=vehicles")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin?tab=vehicles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Vehicles
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Add New Vehicle</h1>
              <p className="text-muted-foreground">Create a new vehicle listing</p>
            </div>
            <Button className="gap-2" onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Vehicle"}
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of the vehicle</CardDescription>
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
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="lexus">Lexus</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="porsche">Porsche</SelectItem>
                        <SelectItem value="tesla">Tesla</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
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
                <CardDescription>Enter additional vehicle specifications</CardDescription>
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
                <CardDescription>Upload images of the vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 bg-muted rounded-full p-3">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Main Image</h3>
                    <p className="text-xs text-muted-foreground mb-4">Upload the primary vehicle image</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>

                  <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 bg-muted rounded-full p-3">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Interior Image</h3>
                    <p className="text-xs text-muted-foreground mb-4">Upload an interior image</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>

                  <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 bg-muted rounded-full p-3">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Additional Image</h3>
                    <p className="text-xs text-muted-foreground mb-4">Upload an additional image</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/admin?tab=vehicles">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Vehicle"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
