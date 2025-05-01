"use client"

import type React from "react"

import { useState } from "react"
import {
  Car,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Update the "View All Activity" button to use Link
import Link from "next/link"

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("week")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Vehicles"
          value="1,284"
          change="+12.5%"
          trend="up"
          icon={<Car className="h-5 w-5" />}
          description="Total vehicles listed"
        />
        <MetricCard
          title="Active Users"
          value="8,642"
          change="+18.2%"
          trend="up"
          icon={<Users className="h-5 w-5" />}
          description="Registered users"
        />
        <MetricCard
          title="Revenue"
          value="$128,450"
          change="+5.4%"
          trend="up"
          icon={<DollarSign className="h-5 w-5" />}
          description="Total revenue"
        />
        <MetricCard
          title="Transactions"
          value="284"
          change="-2.3%"
          trend="down"
          icon={<ShoppingCart className="h-5 w-5" />}
          description="Completed sales"
        />
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                title="New Vehicle Listed"
                description="2023 Tesla Model S listed by John Doe"
                time="5 minutes ago"
                icon={<Car className="h-4 w-4 text-primary" />}
              />
              <ActivityItem
                title="User Registration"
                description="Sarah Johnson created a new account"
                time="15 minutes ago"
                icon={<Users className="h-4 w-4 text-primary" />}
              />
              <ActivityItem
                title="Vehicle Sold"
                description="2022 BMW X5 sold for $65,990"
                time="1 hour ago"
                icon={<ShoppingCart className="h-4 w-4 text-primary" />}
              />
              <ActivityItem
                title="Price Update"
                description="Price reduced on 2021 Audi e-tron GT"
                time="2 hours ago"
                icon={<DollarSign className="h-4 w-4 text-primary" />}
              />
              <ActivityItem
                title="New Review"
                description="5-star review from Michael T."
                time="3 hours ago"
                icon={<CheckCircle className="h-4 w-4 text-primary" />}
              />
            </div>
          </CardContent>
          {/* Replace the CardFooter button with: */}
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/activity">
                View All Activity <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AlertItem
                title="Server Maintenance"
                description="Scheduled maintenance on June 15, 2:00 AM - 4:00 AM"
                severity="warning"
              />
              <AlertItem
                title="Payment Gateway Issue"
                description="Intermittent issues with Stripe integration"
                severity="error"
              />
              <AlertItem
                title="New Feature Deployed"
                description="AI-powered price prediction is now live"
                severity="success"
              />
              <AlertItem title="Database Backup" description="Daily backup completed successfully" severity="info" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    <span className="font-medium">Vehicle Sales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">78/100</span>
                    <Badge variant="outline">78%</Badge>
                  </div>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium">New Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">92/100</span>
                    <Badge variant="outline">92%</Badge>
                  </div>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-medium">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">65/100</span>
                    <Badge variant="outline">65%</Badge>
                  </div>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                    <span className="font-medium">Premium Listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">45/100</span>
                    <Badge variant="outline">45%</Badge>
                  </div>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Vehicles</CardTitle>
            <CardDescription>Most viewed and sold vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">Tesla Model S</h4>
                  <p className="text-sm text-muted-foreground">Electric • 1,250 views</p>
                </div>
                <Badge>+24%</Badge>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">BMW X5</h4>
                  <p className="text-sm text-muted-foreground">Hybrid • 980 views</p>
                </div>
                <Badge>+18%</Badge>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">Mercedes-Benz EQS</h4>
                  <p className="text-sm text-muted-foreground">Electric • 875 views</p>
                </div>
                <Badge>+15%</Badge>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">Porsche 911 Carrera</h4>
                  <p className="text-sm text-muted-foreground">Gasoline • 820 views</p>
                </div>
                <Badge>+12%</Badge>
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
            {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
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

function ActivityItem({
  title,
  description,
  time,
  icon,
}: {
  title: string
  description: string
  time: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 p-3 border rounded-lg">
      <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
        <Clock className="h-3 w-3" />
        <span>{time}</span>
      </div>
    </div>
  )
}

function AlertItem({
  title,
  description,
  severity,
}: {
  title: string
  description: string
  severity: "error" | "warning" | "success" | "info"
}) {
  const getIcon = () => {
    switch (severity) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "info":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (severity) {
      case "error":
        return "bg-red-50 dark:bg-red-950/20"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950/20"
      case "success":
        return "bg-green-50 dark:bg-green-950/20"
      case "info":
        return "bg-blue-50 dark:bg-blue-950/20"
    }
  }

  return (
    <div className={`flex items-start gap-4 p-3 rounded-lg ${getBgColor()}`}>
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
