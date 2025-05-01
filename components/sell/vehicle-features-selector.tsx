"use client"

import { useState } from "react"
import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Common vehicle features organized by category
const COMMON_FEATURES = {
  "Exterior Features": [
    "Alloy Wheels",
    "Sunroof",
    "Panoramic Roof",
    "Roof Rack",
    "Tinted Windows",
    "LED Headlights",
    "Fog Lights",
  ],
  "Interior Features": [
    "Leather Seats",
    "Heated Seats",
    "Ventilated Seats",
    "Memory Seats",
    "Power Seats",
    "Heated Steering Wheel",
    "Ambient Lighting",
  ],
  Technology: [
    "Navigation System",
    "Bluetooth",
    "Apple CarPlay",
    "Android Auto",
    "Wireless Charging",
    "Premium Sound System",
    "Heads-up Display",
    "Digital Dashboard",
  ],
  Safety: [
    "Backup Camera",
    "Blind Spot Monitor",
    "Lane Departure Warning",
    "Adaptive Cruise Control",
    "Automatic Emergency Braking",
    "Parking Sensors",
    "360-degree Camera",
  ],
  "Comfort & Convenience": [
    "Keyless Entry",
    "Push Button Start",
    "Remote Start",
    "Dual-Zone Climate Control",
    "Third Row Seating",
    "Power Liftgate",
    "Hands-free Liftgate",
  ],
  Performance: [
    "Sport Package",
    "Performance Tires",
    "Sport Suspension",
    "All-Wheel Drive",
    "Turbo Charged Engine",
    "Sport Mode",
    "Paddle Shifters",
  ],
}

interface VehicleFeaturesProps {
  selectedFeatures: string[]
  onChange: (features: string[]) => void
}

export default function VehicleFeaturesSelector({ selectedFeatures, onChange }: VehicleFeaturesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Exterior Features")
  const [customFeature, setCustomFeature] = useState("")

  const handleFeatureToggle = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      onChange(selectedFeatures.filter((f) => f !== feature))
    } else {
      onChange([...selectedFeatures, feature])
    }
  }

  const addCustomFeature = () => {
    if (customFeature.trim() && !selectedFeatures.includes(customFeature.trim())) {
      onChange([...selectedFeatures, customFeature.trim()])
      setCustomFeature("")
    }
  }

  const removeFeature = (feature: string) => {
    onChange(selectedFeatures.filter((f) => f !== feature))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(COMMON_FEATURES).map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-3">{activeCategory}</h4>
          <ScrollArea className="h-[240px] pr-4">
            <div className="space-y-2">
              {COMMON_FEATURES[activeCategory as keyof typeof COMMON_FEATURES].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => handleFeatureToggle(feature)}
                  />
                  <Label htmlFor={feature} className="text-sm cursor-pointer">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-3">Selected Features ({selectedFeatures.length})</h4>
          <div className="mb-4">
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add custom feature..."
                value={customFeature}
                onChange={(e) => setCustomFeature(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCustomFeature()
                  }
                }}
              />
              <Button size="sm" onClick={addCustomFeature} disabled={!customFeature.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[200px]">
            <div className="flex flex-wrap gap-2">
              {selectedFeatures.length === 0 ? (
                <p className="text-sm text-muted-foreground">No features selected yet</p>
              ) : (
                selectedFeatures.map((feature) => (
                  <Badge key={feature} variant="secondary" className="flex items-center gap-1 py-1">
                    <Check className="h-3 w-3" />
                    {feature}
                    <button
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                      onClick={() => removeFeature(feature)}
                      aria-label={`Remove ${feature}`}
                    >
                      <span className="sr-only">Remove</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 3L3 9M3 3L9 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
