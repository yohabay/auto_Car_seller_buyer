"use client"

import { useState } from "react"
import { Sparkles, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface ListingEnhancements {
  featured: boolean
  spotlight: boolean
  premium: boolean
  socialBoost: boolean
  aiMatchmaking: boolean
}

interface ListingEnhancementProps {
  enhancements: ListingEnhancements
  onChange: (enhancements: ListingEnhancements) => void
}

export default function ListingEnhancement({ enhancements, onChange }: ListingEnhancementProps) {
  const [showPremiumInfo, setShowPremiumInfo] = useState(false)

  const handleToggle = (enhancement: keyof ListingEnhancements) => {
    onChange({
      ...enhancements,
      [enhancement]: !enhancements[enhancement],
    })
  }

  const calculateTotalCost = () => {
    let total = 0
    if (enhancements.featured) total += 29.99
    if (enhancements.spotlight) total += 19.99
    if (enhancements.premium) total += 49.99
    if (enhancements.socialBoost) total += 14.99
    if (enhancements.aiMatchmaking) total += 9.99
    return total.toFixed(2)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            Listing Enhancements
          </h3>
          <p className="text-sm text-muted-foreground">Boost your listing visibility and sell your vehicle faster</p>
        </div>
        {Object.values(enhancements).some(Boolean) && (
          <Badge variant="outline" className="bg-primary/10 text-primary">
            ${calculateTotalCost()}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={enhancements.featured ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Featured Listing</CardTitle>
            <CardDescription>Top placement in search results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="font-medium">$29.99</p>
              <Switch
                checked={enhancements.featured}
                onCheckedChange={() => handleToggle("featured")}
                aria-label="Toggle featured listing"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            <ul className="space-y-1">
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Top of search results
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Homepage showcase
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> 30 days of promotion
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className={enhancements.spotlight ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Spotlight</CardTitle>
            <CardDescription>Highlight your listing with a special badge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="font-medium">$19.99</p>
              <Switch
                checked={enhancements.spotlight}
                onCheckedChange={() => handleToggle("spotlight")}
                aria-label="Toggle spotlight"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            <ul className="space-y-1">
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> "Spotlight" badge
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Highlighted background
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> 2x more views
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className={enhancements.premium ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Premium Package</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Premium package info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Our most comprehensive package includes professional photography, 3D virtual tour, and detailed
                      inspection report.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>Professional photos & 3D tour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="font-medium">$49.99</p>
              <Switch
                checked={enhancements.premium}
                onCheckedChange={() => handleToggle("premium")}
                aria-label="Toggle premium package"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            <ul className="space-y-1">
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Professional photography
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> 3D virtual tour
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Inspection report
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className={enhancements.socialBoost ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Social Boost</CardTitle>
            <CardDescription>Promote your listing on social media</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="font-medium">$14.99</p>
              <Switch
                checked={enhancements.socialBoost}
                onCheckedChange={() => handleToggle("socialBoost")}
                aria-label="Toggle social boost"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            <ul className="space-y-1">
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Facebook & Instagram ads
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Targeted to local buyers
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Performance analytics
              </li>
            </ul>
          </CardFooter>
        </Card>

        <Card className={enhancements.aiMatchmaking ? "border-primary" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">AI Matchmaking</CardTitle>
            <CardDescription>Connect with potential buyers using AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="font-medium">$9.99</p>
              <Switch
                checked={enhancements.aiMatchmaking}
                onCheckedChange={() => handleToggle("aiMatchmaking")}
                aria-label="Toggle AI matchmaking"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground">
            <ul className="space-y-1">
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> AI buyer matching
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Direct notifications
              </li>
              <li className="flex items-center">
                <Check className="h-3 w-3 mr-1 text-primary" /> Personalized outreach
              </li>
            </ul>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
