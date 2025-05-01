import Link from "next/link"
import { Calendar, Fuel, Gauge } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Car } from "@/lib/car-data"

interface CarListingCardProps {
  car: Car
}

export default function CarListingCard({ car }: CarListingCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/cars/${car.id}`}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={car.images[0] || "/placeholder.svg"}
            alt={`${car.make} ${car.model}`}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {car.discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive">Save ${car.discount.toLocaleString()}</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">
              {car.make} {car.model}
            </h3>
            <Badge variant="outline" className="text-xs">
              {car.condition}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {car.year} • {car.location}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${car.price.toLocaleString()}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-3 w-3" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-3 w-3" />
            <span>{car.fuelType}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
