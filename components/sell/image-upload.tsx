"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  title: string
  description: string
  onImageUploaded: (imageUrl: string) => void
  onImageRemoved: () => void
}

export default function ImageUpload({ title, description, onImageUploaded, onImageRemoved }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Reset any previous errors
    setError(null)

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)")
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit")
      return
    }

    // Simulate upload process
    setIsUploading(true)
    setUploadProgress(0)

    // Create a preview URL
    const imageUrl = URL.createObjectURL(file)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedImage(imageUrl)
          onImageUploaded(imageUrl)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const removeImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage)
    }
    setUploadedImage(null)
    setUploadProgress(0)
    setError(null)
    onImageRemoved()

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="relative">
      {!uploadedImage ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            error ? "border-destructive bg-destructive/5" : "",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

          {isUploading ? (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground animate-pulse" />
              </div>
              <p className="text-sm font-medium">Uploading...</p>
              <Progress value={uploadProgress} className="h-2 w-full" />
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium mb-1">{title}</p>
              <p className="text-xs text-muted-foreground mb-4">{description}</p>

              {error && (
                <div className="flex items-center text-destructive text-sm mb-4">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}

              <Button variant="outline" size="sm" onClick={triggerFileInput}>
                Choose File
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="relative border rounded-lg overflow-hidden">
          <img src={uploadedImage || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={removeImage}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 flex items-center">
            <Check className="h-4 w-4 text-primary mr-2" />
            <span className="text-xs font-medium">{title} uploaded</span>
          </div>
        </div>
      )}
    </div>
  )
}
