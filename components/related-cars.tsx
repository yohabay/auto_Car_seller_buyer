import { cars } from "@/lib/car-data"
import CarListingCard from "@/components/car-listing-card"

interface RelatedCarsProps {
  currentCarId: string
}

export default function RelatedCars({ currentCarId }: RelatedCarsProps) {
  // Get 3 random cars that are not the current car
  const relatedCars = cars
    .filter((car) => car.id !== currentCarId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedCars.map((car) => (
        <CarListingCard key={car.id} car={car} />
      ))}
    </div>
  )
}
