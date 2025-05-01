"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Car, Bell, RefreshCw, Calculator, Scale, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FinanceCalculator from "@/components/financing/finance-calculator"
import ComparisonTool from "@/components/vehicle-comparison/comparison-tool"
import SavedVehicles from "@/components/favorites/saved-vehicles"
import PriceAlerts from "@/components/notifications/price-alerts"
import TradeInEstimator from "@/components/trade-in/trade-in-estimator"
import EnhancedFooter from "@/components/footer/enhanced-footer"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("saved")

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
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button size="sm">
              <Car className="h-4 w-4 mr-2" />
              Browse Cars
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your saved vehicles, alerts, and tools</p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="saved" className="flex items-center gap-2 py-3">
              <Heart className="h-4 w-4" />
              <span className="hidden md:inline">Saved Vehicles</span>
              <span className="md:hidden">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2 py-3">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Price Alerts</span>
              <span className="md:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2 py-3">
              <Calculator className="h-4 w-4" />
              <span className="hidden md:inline">Finance Calculator</span>
              <span className="md:hidden">Finance</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2 py-3">
              <Scale className="h-4 w-4" />
              <span className="hidden md:inline">Compare Vehicles</span>
              <span className="md:hidden">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="tradein" className="flex items-center gap-2 py-3">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden md:inline">Trade-In Value</span>
              <span className="md:hidden">Trade-In</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="space-y-4">
            <SavedVehicles />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <PriceAlerts />
          </TabsContent>

          <TabsContent value="finance" className="space-y-4">
            <FinanceCalculator />
          </TabsContent>

          <TabsContent value="compare" className="space-y-4">
            <ComparisonTool />
          </TabsContent>

          <TabsContent value="tradein" className="space-y-4">
            <TradeInEstimator />
          </TabsContent>
        </Tabs>
      </main>

      {/* Enhanced Footer with Map */}
      <EnhancedFooter />
    </div>
  )
}
