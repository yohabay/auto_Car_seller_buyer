"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  Car,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample activity data
const activities = [
  {
    id: "1",
    action: "New Vehicle Listed",
    description: "2023 Tesla Model S listed by John Doe",
    timestamp: "2023-06-10T14:30:00Z",
    category: "Vehicle",
    user: "John Doe",
  },
  {
    id: "2",
    action: "User Registration",
    description: "Sarah Johnson created a new account",
    timestamp: "2023-06-10T14:15:00Z",
    category: "User",
    user: "Sarah Johnson",
  },
  {
    id: "3",
    action: "Vehicle Sold",
    description: "2022 BMW X5 sold for $65,990",
    timestamp: "2023-06-10T13:45:00Z",
    category: "Sale",
    user: "Michael Smith",
  },
  {
    id: "4",
    action: "Price Update",
    description: "Price reduced on 2021 Audi e-tron GT",
    timestamp: "2023-06-10T12:30:00Z",
    category: "Vehicle",
    user: "Emily Wilson",
  },
  {
    id: "5",
    action: "New Review",
    description: "5-star review from Michael T.",
    timestamp: "2023-06-10T11:15:00Z",
    category: "Review",
    user: "Michael T.",
  },
  {
    id: "6",
    action: "Payment Processed",
    description: "Payment of $1,500 processed for listing premium package",
    timestamp: "2023-06-10T10:45:00Z",
    category: "Payment",
    user: "Robert Brown",
  },
  {
    id: "7",
    action: "Support Ticket Created",
    description: "New support ticket: 'Cannot upload vehicle photos'",
    timestamp: "2023-06-10T10:15:00Z",
    category: "Support",
    user: "Jessica Taylor",
  },
  {
    id: "8",
    action: "Account Updated",
    description: "User updated their profile information",
    timestamp: "2023-06-10T09:30:00Z",
    category: "User",
    user: "David Miller",
  },
  {
    id: "9",
    action: "Vehicle Removed",
    description: "2019 Honda Civic listing removed",
    timestamp: "2023-06-10T09:00:00Z",
    category: "Vehicle",
    user: "Amanda Clark",
  },
  {
    id: "10",
    action: "Login Attempt Failed",
    description: "Failed login attempt from IP 192.168.1.1",
    timestamp: "2023-06-10T08:45:00Z",
    category: "Security",
    user: "Unknown",
  },
]

export default function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  // Filter activities
  const filteredActivities = activities
    .filter((activity) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          activity.action.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.user.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((activity) => {
      // Apply category filter
      if (categoryFilter === "all") return true
      return activity.category.toLowerCase() === categoryFilter.toLowerCase()
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "newest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      if (sortBy === "oldest") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      return 0
    })

  // Get activity icon based on category
  const getActivityIcon = (category: string) => {
    switch (category) {
      case "Vehicle":
        return <Car className="h-4 w-4 text-primary" />
      case "User":
        return <Users className="h-4 w-4 text-primary" />
      case "Sale":
        return <ShoppingCart className="h-4 w-4 text-primary" />
      case "Payment":
        return <DollarSign className="h-4 w-4 text-primary" />
      default:
        return <Clock className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin?tab=dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
            <p className="text-muted-foreground">View all platform activities and events</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Table */}
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>{filteredActivities.length} activities found</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActivityIcon(activity.category)}
                          <span>{activity.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
