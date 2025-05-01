"use client"

import type React from "react"

import { useState } from "react"
import { RefreshCw, Check, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TradeInEstimatorProps {
  className?: string
}

export default function TradeInEstimator({ className }: TradeInEstimatorProps) {
  const [step, setStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [estimateReady, setEstimateReady] = useState(false)

  // Form state
  const [vehicleInfo, setVehicleInfo] = useState({
    make: "",
    model: "",
    year: "2020",
    mileage: "",
    condition: "good",
    exteriorColor: "",
    interiorColor: "",
    transmission: "automatic",
    fuelType: "gasoline",
    features: [] as string[],
    accidents: "none",
    title: "clean",
  })

  const [estimatedValue, setEstimatedValue] = useState({
    low: 0,
    average: 0,
    high: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVehicleInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setVehicleInfo((prev) => ({ ...prev, [name]: value }))
  }

  const calculateEstimate = () => {
    setIsCalculating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Base value calculation (simplified for demo)
      const baseValue = Number.parseInt(vehicleInfo.year) * 100 - 190000

      // Adjust for mileage
      const mileage = Number.parseInt(vehicleInfo.mileage) || 10000
      const mileageAdjustment = Math.max(0, 1 - (mileage - 10000) / 100000)

      // Adjust for condition
      const conditionMultiplier =
        vehicleInfo.condition === "excellent"
          ? 1.1
          : vehicleInfo.condition === "good"
            ? 1.0
            : vehicleInfo.condition === "fair"
              ? 0.9
              : 0.8

      // Adjust for accidents
      const accidentMultiplier = vehicleInfo.accidents === "none" ? 1.0 : vehicleInfo.accidents === "minor" ? 0.9 : 0.8

      // Adjust for title
      const titleMultiplier = vehicleInfo.title === "clean" ? 1.0 : vehicleInfo.title === "rebuilt" ? 0.7 : 0.6

      // Calculate final value
      const calculatedValue = baseValue * mileageAdjustment * conditionMultiplier * accidentMultiplier * titleMultiplier

      // Set range values
      setEstimatedValue({
        low: Math.round(calculatedValue * 0.9),
        average: Math.round(calculatedValue),
        high: Math.round(calculatedValue * 1.1),
      })

      setIsCalculating(false)
      setEstimateReady(true)
    }, 2000)
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const resetForm = () => {
    setVehicleInfo({
      make: "",
      model: "",
      year: "2020",
      mileage: "",
      condition: "good",
      exteriorColor: "",
      interiorColor: "",
      transmission: "automatic",
      fuelType: "gasoline",
      features: [],
      accidents: "none",
      title: "clean",
    })
    setEstimateReady(false)
    setStep(1)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          Trade-In Value Estimator
        </CardTitle>
        <CardDescription>Get an instant estimate of your vehicle's trade-in value</CardDescription>
      </CardHeader>
      <CardContent>
        {estimateReady ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-1">Estimated Trade-In Value</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
              </p>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">${estimatedValue.average.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Value range: ${estimatedValue.low.toLocaleString()} - ${estimatedValue.high.toLocaleString()}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Vehicle Details</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-muted-foreground">Make:</div>
                <div>{vehicleInfo.make}</div>
                <div className="text-muted-foreground">Model:</div>
                <div>{vehicleInfo.model}</div>
                <div className="text-muted-foreground">Year:</div>
                <div>{vehicleInfo.year}</div>
                <div className="text-muted-foreground">Mileage:</div>
                <div>{Number.parseInt(vehicleInfo.mileage).toLocaleString()} miles</div>
                <div className="text-muted-foreground">Condition:</div>
                <div className="capitalize">{vehicleInfo.condition}</div>
                <div className="text-muted-foreground">Accident History:</div>
                <div className="capitalize">{vehicleInfo.accidents}</div>
                <div className="text-muted-foreground">Title Status:</div>
                <div className="capitalize">{vehicleInfo.title}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">What's Next?</h4>
              <p className="text-sm text-muted-foreground">
                This is an estimated value based on current market conditions. For a precise offer, schedule an
                in-person appraisal at our dealership.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Schedule Appraisal</p>
                    <p className="text-muted-foreground">Get an official offer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Browse Inventory</p>
                    <p className="text-muted-foreground">Find your next vehicle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Select value={vehicleInfo.make} onValueChange={(value) => handleSelectChange("make", value)}>
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
                    <Select value={vehicleInfo.year} onValueChange={(value) => handleSelectChange("year", value)}>
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
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Vehicle Condition</Label>
                  <RadioGroup
                    value={vehicleInfo.condition}
                    onValueChange={(value) => handleSelectChange("condition", value)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="excellent" id="excellent" />
                        <div>
                          <Label htmlFor="excellent" className="font-medium">
                            Excellent
                          </Label>
                          <p className="text-xs text-muted-foreground">Like new, no visible wear and tear</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="good" id="good" />
                        <div>
                          <Label htmlFor="good" className="font-medium">
                            Good
                          </Label>
                          <p className="text-xs text-muted-foreground">Minor wear, well maintained</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="fair" id="fair" />
                        <div>
                          <Label htmlFor="fair" className="font-medium">
                            Fair
                          </Label>
                          <p className="text-xs text-muted-foreground">Noticeable wear, some issues</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="poor" id="poor" />
                        <div>
                          <Label htmlFor="poor" className="font-medium">
                            Poor
                          </Label>
                          <p className="text-xs text-muted-foreground">Significant wear, needs repairs</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Accident History</Label>
                  <RadioGroup
                    value={vehicleInfo.accidents}
                    onValueChange={(value) => handleSelectChange("accidents", value)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="none" id="none" />
                        <Label htmlFor="none">No Accidents</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="minor" id="minor" />
                        <Label htmlFor="minor">Minor Accidents</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="major" id="major" />
                        <Label htmlFor="major">Major Accidents</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Title Status</Label>
                  <RadioGroup value={vehicleInfo.title} onValueChange={(value) => handleSelectChange("title", value)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="clean" id="clean" />
                        <Label htmlFor="clean">Clean</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="rebuilt" id="rebuilt" />
                        <Label htmlFor="rebuilt">Rebuilt/Salvage</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other Issues</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              {step < 2 ? (
                <Button type="button" onClick={nextStep} className="ml-auto">
                  Continue
                </Button>
              ) : (
                <Button type="button" onClick={calculateEstimate} disabled={isCalculating} className="ml-auto">
                  {isCalculating ? (
                    <>
                      <span className="mr-2">Calculating...</span>
                      <Progress value={100} className="w-12 h-2 animate-pulse" />
                    </>
                  ) : (
                    "Get Estimate"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {estimateReady ? (
          <>
            <Button variant="outline" onClick={resetForm}>
              Start Over
            </Button>
            <Button>
              Schedule Appraisal <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="w-full text-center text-xs text-muted-foreground">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center justify-center w-full">
                  <Info className="h-3 w-3 mr-1" />
                  How is the value calculated?
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Our AI-powered estimator analyzes current market data, vehicle condition, history, and regional
                    trends to provide an accurate trade-in value range.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
