"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Upload, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface VehicleHistoryUploadProps {
  onReportUploaded: (reportUrl: string) => void
  onReportRemoved: () => void
}

export default function VehicleHistoryUpload({ onReportUploaded, onReportRemoved }: VehicleHistoryUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedReport, setUploadedReport] = useState<string | null>(null)
  const [reportName, setReportName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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

    // Check file type (PDF or common document formats)
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF or document file")
      return
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit")
      return
    }

    // Set the report name
    setReportName(file.name)

    // Simulate upload process
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate a file URL
    const reportUrl = URL.createObjectURL(file)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedReport(reportUrl)
          onReportUploaded(reportUrl)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const removeReport = () => {
    if (uploadedReport) {
      URL.revokeObjectURL(uploadedReport)
    }
    setUploadedReport(null)
    setReportName(null)
    setUploadProgress(0)
    setError(null)
    onReportRemoved()
  }

  return (
    <div className="border rounded-lg p-4">
      {!uploadedReport ? (
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
          <input
            type="file"
            id="history-report"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          {isUploading ? (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground animate-pulse" />
              </div>
              <p className="text-sm font-medium">Uploading report...</p>
              <Progress value={uploadProgress} className="h-2 w-full" />
            </div>
          ) : (
            <>
              <FileText className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium mb-1">Vehicle History Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a CarFax, AutoCheck, or other vehicle history report (PDF or document)
              </p>

              {error && (
                <div className="flex items-center text-destructive text-sm mb-4">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}

              <Button variant="outline" onClick={() => document.getElementById("history-report")?.click()}>
                Select Report
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{reportName}</h4>
              <p className="text-xs text-muted-foreground">Vehicle history report uploaded</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={uploadedReport} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={removeReport}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
