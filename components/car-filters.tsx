"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Car, cars as allCars } from "@/lib/car-data"

interface CarFiltersProps {
  onFilterChange: (filteredCars: Car[]) => void
}

export default function CarFilters({ onFilterChange }: CarFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 150000])
  const [yearRange, setYearRange] = useState([2018, 2023])
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])

  const makes = Array.from(new Set(allCars.map((car) => car.make)))
  const fuelTypes = Array.from(new Set(allCars.map((car) => car.fuelType)))
  const conditions = Array.from(new Set(allCars.map((car) => car.condition)))

  const toggleMake = (make: string) => {
    setSelectedMakes((prev) => (prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]))
  }

  const toggleFuelType = (type: string) => {
    setSelectedFuelTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    )
  }

  const applyFilters = () => {
    let filteredCars = [...allCars]

    // Filter by price
    filteredCars = filteredCars.filter((car) => car.price >= priceRange[0] && car.price <= priceRange[1])

    // Filter by year
    filteredCars = filteredCars.filter((car) => car.year >= yearRange[0] && car.year <= yearRange[1])

    // Filter by make
    if (selectedMakes.length > 0) {
      filteredCars = filteredCars.filter((car) => selectedMakes.includes(car.make))
    }

    // Filter by fuel type
    if (selectedFuelTypes.length > 0) {
      filteredCars = filteredCars.filter((car) => selectedFuelTypes.includes(car.fuelType))
    }

    // Filter by condition
    if (selectedConditions.length > 0) {
      filteredCars = filteredCars.filter((car) => selectedConditions.includes(car.condition))
    }

    onFilterChange(filteredCars)
  }

  const resetFilters = () => {
    setPriceRange([0, 150000])
    setYearRange([2018, 2023])
    setSelectedMakes([])
    setSelectedFuelTypes([])
    setSelectedConditions([])
    onFilterChange(allCars)
  }

  // Apply filters whenever any filter changes
  useEffect(() => {
    applyFilters()
  }, [priceRange, yearRange, selectedMakes, selectedFuelTypes, selectedConditions])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          defaultValue={[0, 150000]}
          max={150000}
          step={1000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Year</h3>
        <Slider
          defaultValue={[2018, 2023]}
          min={2010}
          max={2023}
          step={1}
          value={yearRange}
          onValueChange={setYearRange}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm">
          <span>{yearRange[0]}</span>
          <span>{yearRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Make</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedMakes.length === 0 ? "Select Makes" : `${selectedMakes.length} selected`}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {makes.map((make) => (
              <DropdownMenuCheckboxItem
                key={make}
                checked={selectedMakes.includes(make)}
                onCheckedChange={() => toggleMake(make)}
              >
                {make}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <h3 className="font-medium mb-3">Fuel Type</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedFuelTypes.length === 0 ? "Select Fuel Types" : `${selectedFuelTypes.length} selected`}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {fuelTypes.map((type) => (
              <DropdownMenuCheckboxItem
                key={type}
                checked={selectedFuelTypes.includes(type)}
                onCheckedChange={() => toggleFuelType(type)}
              >
                {type}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <h3 className="font-medium mb-3">Condition</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedConditions.length === 0 ? "Select Conditions" : `${selectedConditions.length} selected`}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {conditions.map((condition) => (
              <DropdownMenuCheckboxItem
                key={condition}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => toggleCondition(condition)}
              >
                {condition}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Button className="w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  )
}
