"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Car, Calendar, Gauge, Fuel, Cog, Palette, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cars } from "@/lib/car-data"

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If the ID is "new", we should redirect to the new vehicle page
    if (params.id === "new") {
      router.push("/admin/vehicles/new")
      return
    }

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

        setVehicle(foundVehicle)
      } catch (err) {
        setError("Failed to load vehicle details")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [params.id, router])

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

  if (error || !vehicle) {
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
              <Link href="/admin?tab=vehicles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Vehicles
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-muted-foreground">
                ID: {vehicle.id} • Added on {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/admin/vehicles/${vehicle.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Vehicle
                </Link>
              </Button>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader className="p-4">
                <CardTitle>Vehicle Images</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                  <img
                    src={vehicle.images[0] || "/placeholder.svg?height=600&width=800"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 p-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-md overflow-hidden">
                      <img
                        src={vehicle.images[index] || "/placeholder.svg?height=150&width=200"}
                        alt={`${vehicle.make} ${vehicle.model} view ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle>Vehicle Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Listing Status</div>
                    <Badge variant="default" className="px-3 py-1">
                      Active
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Price</div>
                    <div className="text-2xl font-bold">${vehicle.price.toLocaleString()}</div>
                  </div>

                  <Separator />

                  <div>
                    <div className="text-sm font-medium mb-1">Views</div>
                    <div className="flex items-center justify-between">
                      <span>Last 7 days</span>
                      <span className="font-medium">124</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Inquiries</div>
                    <div className="flex items-center justify-between">
                      <span>Total</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-1">Saved</div>
                    <div className="flex items-center justify-between">
                      <span>Favorites</span>
                      <span className="font-medium">32</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/cars/${vehicle.id}`} target="_blank">
                    View Public Listing
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Vehicle Details</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle>Specifications</CardTitle>
                  <CardDescription>Detailed information about this vehicle</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Make & Model</div>
                          <div className="text-muted-foreground">
                            {vehicle.make} {vehicle.model}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Year</div>
                          <div className="text-muted-foreground">{vehicle.year}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Gauge className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Mileage</div>
                          <div className="text-muted-foreground">{vehicle.mileage.toLocaleString()} miles</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Fuel className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Fuel Type</div>
                          <div className="text-muted-foreground">{vehicle.fuelType}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Cog className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Transmission</div>
                          <div className="text-muted-foreground">{vehicle.transmission}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Exterior Color</div>
                          <div className="text-muted-foreground">{vehicle.exteriorColor || "Not specified"}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Interior Color</div>
                          <div className="text-muted-foreground">{vehicle.interiorColor || "Not specified"}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-muted p-2 rounded-md">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Price</div>
                          <div className="text-muted-foreground">${vehicle.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {vehicle.description ||
                        `This ${vehicle.year} ${vehicle.make} ${vehicle.model} is a ${vehicle.condition.toLowerCase()} vehicle with ${vehicle.mileage.toLocaleString()} miles. It features a ${vehicle.transmission.toLowerCase()} transmission and runs on ${vehicle.fuelType.toLowerCase()}.`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle>Vehicle History</CardTitle>
                  <CardDescription>Timeline of changes and updates</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 text-sm text-muted-foreground text-right">
                        {new Date().toLocaleDateString()}
                      </div>
                      <div className="flex-1 border-l pl-4 pb-4">
                        <div className="font-medium">Listing created</div>
                        <div className="text-sm text-muted-foreground">Vehicle was added to the system by Admin</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 text-sm text-muted-foreground text-right">
                        {new Date(Date.now() - 86400000).toLocaleDateString()}
                      </div>
                      <div className="flex-1 border-l pl-4 pb-4">
                        <div className="font-medium">Price updated</div>
                        <div className="text-sm text-muted-foreground">
                          Price changed from ${(vehicle.price + 1000).toLocaleString()} to $
                          {vehicle.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 text-sm text-muted-foreground text-right">
                        {new Date(Date.now() - 172800000).toLocaleDateString()}
                      </div>
                      <div className="flex-1 border-l pl-4">
                        <div className="font-medium">Images updated</div>
                        <div className="text-sm text-muted-foreground">New images were added to the listing</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inquiries">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle>Customer Inquiries</CardTitle>
                  <CardDescription>Recent inquiries about this vehicle</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(Date.now() - 43200000).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        I'm interested in this vehicle. Is it still available? Can I schedule a test drive for this
                        weekend? I'd like to bring my mechanic along to check it out if possible.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Sarah Johnson</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(Date.now() - 172800000).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Hello, I'm wondering if you would consider taking a trade-in for this vehicle? I have a 2018
                        Honda Civic in excellent condition with low mileage.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">Michael Brown</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(Date.now() - 259200000).toLocaleString()}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        What's the lowest price you can offer on this vehicle? I'm ready to make a purchase this week if
                        we can agree on a good price.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button variant="outline" className="w-full">
                    View All Inquiries
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
