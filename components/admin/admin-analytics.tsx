"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Car,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAnalytics() {
  const [timeframe, setTimeframe] = useState("month")
  const [chartType, setChartType] = useState("sales")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Platform performance and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue placeholder="Select timeframe" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Sales"
          value="$284,546"
          change="+12.5%"
          trend="up"
          icon={<DollarSign className="h-5 w-5" />}
          description={`vs previous ${timeframe}`}
        />
        <MetricCard
          title="Active Users"
          value="8,642"
          change="+18.2%"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description={`vs previous ${timeframe}`}
        />
        <MetricCard
          title="New Listings"
          value="1,284"
          change="-2.3%"
          trend="down"
          icon={<Car className="h-5 w-5" />}
          description={`vs previous ${timeframe}`}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          change="+0.8%"
          trend="up"
          icon={<ShoppingCart className="h-5 w-5" />}
          description={`vs previous ${timeframe}`}
        />
      </div>

      {/* Chart Section */}
      <Card className="col-span-full">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                {chartType === "sales" && "Sales and revenue trends"}
                {chartType === "users" && "User acquisition and engagement"}
                {chartType === "listings" && "Vehicle listing activity"}
              </CardDescription>
            </div>
            <Tabs value={chartType} onValueChange={setChartType} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sales" className="flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  <span className="hidden md:inline">Sales</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden md:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger value="listings" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  <span className="hidden md:inline">Listings</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6">
            <div className="h-[350px] w-full flex items-center justify-center bg-muted/20 rounded-lg border border-dashed">
              {chartType === "sales" && (
                <div className="text-center">
                  <LineChart className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Sales and Revenue Chart</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    (This is a placeholder for a real chart component)
                  </p>
                </div>
              )}
              {chartType === "users" && (
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">User Acquisition Chart</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    (This is a placeholder for a real chart component)
                  </p>
                </div>
              )}
              {chartType === "listings" && (
                <div className="text-center">
                  <PieChart className="h-10 w-10 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Listing Distribution Chart</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    (This is a placeholder for a real chart component)
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Categories</CardTitle>
            <CardDescription>Vehicle categories with highest engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Electric Vehicles</span>
                </div>
                <span className="font-medium">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>SUVs</span>
                </div>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Luxury Sedans</span>
                </div>
                <span className="font-medium">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Sports Cars</span>
                </div>
                <span className="font-medium">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Hybrids</span>
                </div>
                <span className="font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>User age and location distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-muted rounded-t-md">
                      <div className="bg-primary h-16 rounded-t-md" style={{ height: "30px" }}></div>
                    </div>
                    <span className="text-xs mt-1">18-24</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-muted rounded-t-md">
                      <div className="bg-primary h-16 rounded-t-md" style={{ height: "60px" }}></div>
                    </div>
                    <span className="text-xs mt-1">25-34</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-muted rounded-t-md">
                      <div className="bg-primary h-16 rounded-t-md" style={{ height: "80px" }}></div>
                    </div>
                    <span className="text-xs mt-1">35-44</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-muted rounded-t-md">
                      <div className="bg-primary h-16 rounded-t-md" style={{ height: "50px" }}></div>
                    </div>
                    <span className="text-xs mt-1">45-54</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-muted rounded-t-md">
                      <div className="bg-primary h-16 rounded-t-md" style={{ height: "25px" }}></div>
                    </div>
                    <span className="text-xs mt-1">55+</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Top Locations</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>New York</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>California</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Texas</span>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Florida</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
  description,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
          <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>{change}</span>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
