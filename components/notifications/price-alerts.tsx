"use client"

import { useState } from "react"
import { Bell, AlertTriangle, Check, X, ArrowDown, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cars } from "@/lib/car-data"
import type { Car as CarType } from "@/lib/car-data"

interface PriceAlert {
  id: string
  carId: string
  targetPrice: number
  isActive: boolean
  createdAt: Date
}

interface PriceAlertsProps {
  className?: string
}

export default function PriceAlerts({ className }: PriceAlertsProps) {
  // Sample alerts for demonstration
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: "1",
      carId: "1",
      targetPrice: 85000,
      isActive: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      id: "2",
      carId: "3",
      targetPrice: 95000,
      isActive: true,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ])

  const [newAlertCarId, setNewAlertCarId] = useState<string | null>(null)
  const [newAlertPrice, setNewAlertPrice] = useState<number>(0)
  const [globalAlertsEnabled, setGlobalAlertsEnabled] = useState(true)

  const toggleAlertStatus = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
  }

  const startCreatingAlert = (carId: string) => {
    const car = cars.find((c) => c.id === carId)
    if (car) {
      setNewAlertCarId(carId)
      setNewAlertPrice(Math.round(car.price * 0.9)) // Default to 10% below current price
    }
  }

  const cancelCreatingAlert = () => {
    setNewAlertCarId(null)
  }

  const saveNewAlert = () => {
    if (newAlertCarId) {
      const newAlert: PriceAlert = {
        id: Date.now().toString(),
        carId: newAlertCarId,
        targetPrice: newAlertPrice,
        isActive: true,
        createdAt: new Date(),
      }
      setAlerts([...alerts, newAlert])
      setNewAlertCarId(null)
    }
  }

  const getCarById = (carId: string): CarType | undefined => {
    return cars.find((car) => car.id === carId)
  }

  const getVehicleName = (vehicle: CarType) => {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Price Alerts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Switch id="global-alerts" checked={globalAlertsEnabled} onCheckedChange={setGlobalAlertsEnabled} />
            <Label htmlFor="global-alerts" className="text-sm">
              {globalAlertsEnabled ? "Alerts On" : "Alerts Off"}
            </Label>
          </div>
        </div>
        <CardDescription>Get notified when vehicle prices drop to your target</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!globalAlertsEnabled && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Price alerts are currently disabled. Toggle the switch above to receive notifications.
            </AlertDescription>
          </Alert>
        )}

        {newAlertCarId && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Create New Price Alert</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={getCarById(newAlertCarId)?.images[0] || "/placeholder.svg"}
                  alt="Vehicle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{getVehicleName(getCarById(newAlertCarId)!)}</p>
                <p className="text-sm text-muted-foreground">
                  Current price: ${getCarById(newAlertCarId)?.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Target Price: ${newAlertPrice.toLocaleString()}</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round(
                    ((getCarById(newAlertCarId)!.price - newAlertPrice) / getCarById(newAlertCarId)!.price) * 100,
                  )}
                  % below current price
                </span>
              </div>
              <Slider
                min={Math.round(getCarById(newAlertCarId)!.price * 0.7)}
                max={getCarById(newAlertCarId)!.price}
                step={500}
                value={[newAlertPrice]}
                onValueChange={(value) => setNewAlertPrice(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-30%</span>
                <span>Current Price</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={cancelCreatingAlert}>
                Cancel
              </Button>
              <Button onClick={saveNewAlert}>Save Alert</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <Bell className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h4 className="font-medium mb-1">No price alerts set</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Create alerts to get notified when prices drop to your target
              </p>
            </div>
          ) : (
            alerts.map((alert) => {
              const car = getCarById(alert.carId)
              if (!car) return null

              const priceDifference = car.price - alert.targetPrice
              const percentDifference = Math.round((priceDifference / car.price) * 100)

              return (
                <div
                  key={alert.id}
                  className={`border rounded-lg overflow-hidden ${!alert.isActive ? "opacity-60" : ""}`}
                >
                  <div className="flex items-center p-4">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={car.images[0] || "/placeholder.svg"}
                        alt={getVehicleName(car)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{getVehicleName(car)}</h3>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={alert.isActive}
                            onCheckedChange={() => toggleAlertStatus(alert.id)}
                            aria-label="Toggle alert"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => deleteAlert(alert.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            <ArrowDown className="h-3 w-3 mr-1" />${alert.targetPrice.toLocaleString()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {percentDifference}% below current price
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">Created {formatDate(alert.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted px-4 py-2 flex items-center justify-between text-sm">
                    <span>Current: ${car.price.toLocaleString()}</span>
                    <span>Target: ${alert.targetPrice.toLocaleString()}</span>
                    <span>
                      {priceDifference > 0 ? (
                        <span className="text-orange-600">${priceDifference.toLocaleString()} to go</span>
                      ) : (
                        <span className="text-green-600 flex items-center">
                          <Check className="h-3 w-3 mr-1" /> Target reached!
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {!newAlertCarId && (
          <div className="pt-4">
            <h3 className="font-medium mb-3">Create Alert for Popular Vehicles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cars.slice(0, 4).map((car) => (
                <Button
                  key={car.id}
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => startCreatingAlert(car.id)}
                >
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{getVehicleName(car)}</p>
                      <p className="text-xs text-muted-foreground">${car.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!!newAlertCarId} onClick={() => startCreatingAlert(cars[0].id)}>
          <Bell className="mr-2 h-4 w-4" />
          Create New Price Alert
        </Button>
      </CardFooter>
    </Card>
  )
}
