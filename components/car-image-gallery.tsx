"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarImageGalleryProps {
  images: string[]
}

export default function CarImageGallery({ images }: CarImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="relative">
      <div className="aspect-video overflow-hidden rounded-lg border">
        <img src={images[currentImage] || "/placeholder.svg"} alt="Car image" className="h-full w-full object-cover" />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={prevImage}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous image</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={nextImage}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next image</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 text-foreground"
      >
        <Maximize className="h-4 w-4" />
        <span className="sr-only">View fullscreen</span>
      </Button>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative flex-shrink-0 cursor-pointer overflow-hidden rounded border ${
              index === currentImage ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Car thumbnail ${index + 1}`}
              className="h-16 w-24 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
