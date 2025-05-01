"use client"
import { Shield, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export type WarrantyOption = "none" | "basic" | "premium" | "comprehensive"

interface WarrantyOptionsProps {
  selectedWarranty: WarrantyOption
  onChange: (option: WarrantyOption) => void
}

export default function WarrantyOptions({ selectedWarranty, onChange }: WarrantyOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium flex items-center">
          <Shield className="h-5 w-5 text-primary mr-2" />
          Warranty Options
        </h3>
        <p className="text-sm text-muted-foreground">
          Offer a warranty to increase buyer confidence and potentially sell faster
        </p>
      </div>

      <RadioGroup value={selectedWarranty} onValueChange={(value) => onChange(value as WarrantyOption)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={selectedWarranty === "none" ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <CardTitle className="text-base">No Warranty</CardTitle>
              </div>
              <CardDescription>Sell as-is with no additional coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">$0</p>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <p>
                Vehicle sold in current condition with no additional warranty beyond any remaining factory coverage.
              </p>
            </CardFooter>
          </Card>

          <Card className={selectedWarranty === "basic" ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="basic" />
                <CardTitle className="text-base">Basic Coverage</CardTitle>
              </div>
              <CardDescription>30-day / 1,000 mile limited warranty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="font-medium">$199</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Basic warranty info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Covers engine, transmission, and drivetrain for 30 days or 1,000 miles, whichever comes first.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <ul className="space-y-1">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Engine & Transmission
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Drivetrain
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> 30-day coverage
                </li>
              </ul>
            </CardFooter>
          </Card>

          <Card className={selectedWarranty === "premium" ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="premium" />
                <CardTitle className="text-base">Premium Coverage</CardTitle>
              </div>
              <CardDescription>90-day / 3,000 mile extended warranty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="font-medium">$399</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Premium warranty info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Comprehensive coverage of major systems for 90 days or 3,000 miles, whichever comes first.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <ul className="space-y-1">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Engine & Transmission
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Electrical Systems
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Air Conditioning
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> 90-day coverage
                </li>
              </ul>
            </CardFooter>
          </Card>

          <Card className={selectedWarranty === "comprehensive" ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comprehensive" id="comprehensive" />
                <CardTitle className="text-base">Comprehensive Coverage</CardTitle>
              </div>
              <CardDescription>6-month / 6,000 mile full warranty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="font-medium">$799</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Comprehensive warranty info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Bumper-to-bumper coverage for 6 months or 6,000 miles, whichever comes first. Includes roadside
                        assistance.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
            <CardFooter className="pt-0 text-xs text-muted-foreground">
              <ul className="space-y-1">
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Bumper-to-bumper
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Roadside assistance
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> Rental car coverage
                </li>
                <li className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-primary" /> 6-month coverage
                </li>
              </ul>
            </CardFooter>
          </Card>
        </div>
      </RadioGroup>
    </div>
  )
}
