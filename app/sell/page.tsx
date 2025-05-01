"use client"

import type React from "react"
import type { MaintenanceRecord } from "@/components/sell/maintenance-history"
import type { ListingEnhancements } from "@/components/sell/listing-enhancement"
import type { WarrantyOption } from "@/components/sell/warranty-options"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Car, Info, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginModal from "@/components/auth/login-modal"
import SignupModal from "@/components/auth/signup-modal"
import ImageUpload from "@/components/sell/image-upload"
import VehicleFeaturesSelector from "@/components/sell/vehicle-features-selector"
import VehicleHistoryUpload from "@/components/sell/vehicle-history-upload"
import MaintenanceHistory from "@/components/sell/maintenance-history"
import ListingEnhancement from "@/components/sell/listing-enhancement"
import WarrantyOptions from "@/components/sell/warranty-options"
import EnhancedFooter from "@/components/footer/enhanced-footer"

interface VehicleImages {
  frontExterior: string | null
  sideExterior: string | null
  interiorDashboard: string | null
  additional: string | null
}

export default function SellVehiclePage() {
  const [step, setStep] = useState(1)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("details")

  // Form state
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "2020",
    mileage: "",
    condition: "used",
    exteriorColor: "",
    interiorColor: "",
    transmission: "automatic",
    fuelType: "gasoline",
    price: 20000,
    description: "",
    features: [] as string[],
  })

  const [vehicleImages, setVehicleImages] = useState<VehicleImages>({
    frontExterior: null,
    sideExterior: null,
    interiorDashboard: null,
    additional: null,
  })

  const [historyReport, setHistoryReport] = useState<string | null>(null)
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([])
  const [listingEnhancements, setListingEnhancements] = useState<ListingEnhancements>({
    featured: false,
    spotlight: false,
    premium: false,
    socialBoost: false,
    aiMatchmaking: false,
  })
  const [warrantyOption, setWarrantyOption] = useState<WarrantyOption>("none")
  const [termsAgreed, setTermsAgreed] = useState(false)

  useEffect(() => {
    // Calculate form completion progress
    let completed = 0
    let total = 0

    // Step 1 fields
    const step1Fields = ["make", "model", "year", "mileage", "condition", "transmission"]
    total += step1Fields.length
    completed += step1Fields.filter((field) => vehicleInfo[field as keyof typeof vehicleInfo]).length

    // Step 2 fields
    const step2Fields = ["exteriorColor", "interiorColor", "fuelType"]
    total += step2Fields.length
    completed += step2Fields.filter((field) => vehicleInfo[field as keyof typeof vehicleInfo]).length

    // Images
    total += 4 // 4 image slots
    completed += Object.values(vehicleImages).filter((img) => img !== null).length

    // Features
    total += 1 // At least one feature
    if (vehicleInfo.features.length > 0) completed += 1

    // Step 3 fields
    total += 2 // price and description
    if (vehicleInfo.price > 0) completed += 1
    if (vehicleInfo.description) completed += 1

    // History report
    total += 1
    if (historyReport) completed += 1

    // Terms agreement
    total += 1
    if (termsAgreed) completed += 1

    setFormProgress(Math.floor((completed / total) * 100))
  }, [vehicleInfo, vehicleImages, historyReport, termsAgreed])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setVehicleInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setVehicleInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (value: number[]) => {
    setVehicleInfo((prev) => ({ ...prev, price: value[0] }))
  }

  const handleImageUploaded = (type: keyof VehicleImages, imageUrl: string) => {
    setVehicleImages((prev) => ({
      ...prev,
      [type]: imageUrl,
    }))
  }

  const handleImageRemoved = (type: keyof VehicleImages) => {
    setVehicleImages((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const handleFeaturesChange = (features: string[]) => {
    setVehicleInfo((prev) => ({
      ...prev,
      features,
    }))
  }

  const handleHistoryReportUploaded = (reportUrl: string) => {
    setHistoryReport(reportUrl)
  }

  const handleHistoryReportRemoved = () => {
    setHistoryReport(null)
  }

  const validateStep = (stepNumber: number): boolean => {
    const errors: string[] = []

    if (stepNumber === 1) {
      if (!vehicleInfo.make) errors.push("Please select a make")
      if (!vehicleInfo.model) errors.push("Please enter a model")
      if (!vehicleInfo.mileage) errors.push("Please enter the mileage")
    }

    if (stepNumber === 2) {
      if (Object.values(vehicleImages).every((img) => img === null)) {
        errors.push("Please upload at least one image of your vehicle")
      }
    }

    if (stepNumber === 3) {
      if (!vehicleInfo.description) errors.push("Please provide a description")
      if (!termsAgreed) errors.push("You must agree to the terms")
    }

    setFormErrors(errors)
    return errors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(3)) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Vehicle listing submitted:", {
      ...vehicleInfo,
      images: vehicleImages,
      historyReport,
      maintenanceRecords,
      listingEnhancements,
      warrantyOption,
    })

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
      window.scrollTo(0, 0)
      setFormErrors([])
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
    setFormErrors([])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex" onClick={() => setIsLoginOpen(true)}>
              Log In
            </Button>
            <Button size="sm" onClick={() => setIsSignupOpen(true)}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 flex-1">
        {!isSuccess ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Sell Your Vehicle</h1>
              <p className="text-muted-foreground">
                List your car on AutoX Neo and reach thousands of potential buyers.
              </p>
            </div>

            {/* Form Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Form Completion</span>
                <span className="text-sm font-medium">{formProgress}%</span>
              </div>
              <Progress value={formProgress} className="h-2" />
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Car className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Vehicle Details</span>
                </div>
                <div className="w-16 h-1 bg-muted">
                  <div className={`h-full bg-primary ${step >= 2 ? "w-full" : "w-0"} transition-all`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Photos & Features</span>
                </div>
                <div className="w-16 h-1 bg-muted">
                  <div className={`h-full bg-primary ${step >= 3 ? "w-full" : "w-0"} transition-all`}></div>
                </div>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Info className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Pricing & Enhancements</span>
                </div>
              </div>
            </div>

            {formErrors.length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc pl-5 mt-2">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Vehicle Details */}
              {step === 1 && (
                <div className="space-y-6">
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
                          <RadioGroupItem value="new" id="new" />
                          <Label htmlFor="new">New</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="used" id="used" />
                          <Label htmlFor="used">Used</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="certified" id="certified" />
                          <Label htmlFor="certified">Certified Pre-Owned</Label>
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
                          <RadioGroupItem value="automatic" id="automatic" />
                          <Label htmlFor="automatic">Automatic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manual" id="manual" />
                          <Label htmlFor="manual">Manual</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Photos & Features */}
              {step === 2 && (
                <div className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="details">Photos & Details</TabsTrigger>
                      <TabsTrigger value="features">Features & History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-6 pt-4">
                      <div className="space-y-4">
                        <Label className="block mb-2">Vehicle Photos</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <ImageUpload
                                title="Exterior Front"
                                description="Show the front of your vehicle"
                                onImageUploaded={(url) => handleImageUploaded("frontExterior", url)}
                                onImageRemoved={() => handleImageRemoved("frontExterior")}
                              />
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <ImageUpload
                                title="Exterior Side"
                                description="Show the side profile"
                                onImageUploaded={(url) => handleImageUploaded("sideExterior", url)}
                                onImageRemoved={() => handleImageRemoved("sideExterior")}
                              />
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <ImageUpload
                                title="Interior Dashboard"
                                description="Show the interior and dashboard"
                                onImageUploaded={(url) => handleImageUploaded("interiorDashboard", url)}
                                onImageRemoved={() => handleImageRemoved("interiorDashboard")}
                              />
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-4">
                              <ImageUpload
                                title="Additional Photo"
                                description="Add another angle or feature"
                                onImageUploaded={(url) => handleImageUploaded("additional", url)}
                                onImageRemoved={() => handleImageRemoved("additional")}
                              />
                            </CardContent>
                          </Card>
                        </div>
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

                      <div className="space-y-2">
                        <Label>Fuel Type</Label>
                        <RadioGroup
                          value={vehicleInfo.fuelType}
                          onValueChange={(value) => handleSelectChange("fuelType", value)}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="gasoline" id="gasoline" />
                              <Label htmlFor="gasoline">Gasoline</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="diesel" id="diesel" />
                              <Label htmlFor="diesel">Diesel</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hybrid" id="hybrid" />
                              <Label htmlFor="hybrid">Hybrid</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="electric" id="electric" />
                              <Label htmlFor="electric">Electric</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="space-y-6 pt-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Vehicle Features</h3>
                        <VehicleFeaturesSelector
                          selectedFeatures={vehicleInfo.features}
                          onChange={handleFeaturesChange}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Vehicle History</h3>
                        <VehicleHistoryUpload
                          onReportUploaded={handleHistoryReportUploaded}
                          onReportRemoved={handleHistoryReportRemoved}
                        />
                      </div>

                      <div className="space-y-4">
                        <MaintenanceHistory records={maintenanceRecords} onChange={setMaintenanceRecords} />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Pricing & Enhancements */}
              {step === 3 && (
                <div className="space-y-6">
                  <Accordion type="single" collapsible defaultValue="pricing" className="w-full">
                    <AccordionItem value="pricing">
                      <AccordionTrigger>Pricing & Description</AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <Label htmlFor="price">Asking Price</Label>
                              <span className="text-sm font-medium">${vehicleInfo.price.toLocaleString()}</span>
                            </div>
                            <Slider
                              id="price"
                              min={1000}
                              max={150000}
                              step={500}
                              value={[vehicleInfo.price]}
                              onValueChange={handleSliderChange}
                              className="mb-2"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>$1,000</span>
                              <span>$150,000</span>
                            </div>
                          </div>

                          <div className="pt-4">
                            <div className="flex items-start gap-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
                              <Info className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="text-sm font-medium mb-1">AI Price Suggestion</p>
                                <p className="text-sm text-muted-foreground">
                                  Based on your vehicle details, similar {vehicleInfo.year} {vehicleInfo.make}{" "}
                                  {vehicleInfo.model}
                                  vehicles are selling for{" "}
                                  <span className="font-medium">
                                    ${(vehicleInfo.price * 0.95).toLocaleString()} - $
                                    {(vehicleInfo.price * 1.05).toLocaleString()}
                                  </span>{" "}
                                  in your area.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Vehicle Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe your vehicle's condition, history, and any special features..."
                            rows={6}
                            value={vehicleInfo.description}
                            onChange={handleInputChange}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="warranty">
                      <AccordionTrigger>Warranty Options</AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <WarrantyOptions selectedWarranty={warrantyOption} onChange={setWarrantyOption} />
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="enhancements">
                      <AccordionTrigger>Listing Enhancements</AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <ListingEnhancement enhancements={listingEnhancements} onChange={setListingEnhancements} />
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="agreement">
                      <AccordionTrigger>Seller Agreement</AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-4">
                        <h3 className="font-medium">Seller Agreement</h3>
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            id="agreement"
                            className="h-4 w-4 mt-1"
                            checked={termsAgreed}
                            onChange={(e) => setTermsAgreed(e.target.checked)}
                          />
                          <Label htmlFor="agreement" className="text-sm font-normal">
                            I confirm that all information provided is accurate and I am the legal owner of this vehicle
                            or authorized to sell it. I agree to AutoX Neo's terms of service and listing policies.
                          </Label>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Submitting...</span>
                          <Progress value={100} className="w-12 h-2 animate-pulse" />
                        </>
                      ) : (
                        "List My Vehicle"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Your Vehicle Listing is Live!</h1>
            <p className="text-muted-foreground mb-8">
              Your {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model} has been successfully listed on AutoX Neo.
              Our AI will start matching your vehicle with potential buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/cars">Browse Other Vehicles</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Footer with Map */}
      <EnhancedFooter />

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenSignup={() => setIsSignupOpen(true)}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </div>
  )
}
