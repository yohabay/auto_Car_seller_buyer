"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const carImages = [
  {
    src: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=600&fit=crop",
    alt: "Luxury Tesla Model S with AR overlay showing performance stats",
  },
  {
    src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&h=600&fit=crop",
    alt: "3D model of a BMW X5 SUV that can be rotated and explored",
  },
  {
    src: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1200&h=600&fit=crop",
    alt: "AI price prediction graph overlaid on a Porsche 911",
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((current) => (current === carImages.length - 1 ? 0 : current + 1))
  }

  const previous = () => {
    setCurrent((current) => (current === 0 ? carImages.length - 1 : current - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border shadow-xl">
      <div className="relative aspect-video overflow-hidden">
        {carImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {index === 0 && "Experience Cars in Augmented Reality"}
                  {index === 1 && "Explore Every Detail in 3D"}
                  {index === 2 && "AI-Powered Price Predictions"}
                </h3>
                <p className="text-white/80 max-w-md">
                  {index === 0 && "See how a car would look in your driveway before you buy it."}
                  {index === 1 && "Rotate, zoom, and inspect vehicles from every angle."}
                  {index === 2 && "Get real-time market insights and price forecasts."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={previous}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={next}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {carImages.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`h-1.5 w-6 rounded-full p-0 ${index === current ? "bg-primary" : "bg-muted"}`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
