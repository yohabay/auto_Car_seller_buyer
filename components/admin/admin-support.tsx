"use client"

import { useState } from "react"
import {
  MessageSquare,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  ArrowUpDown,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Add Link import
import Link from "next/link"

// Sample support tickets
const tickets = [
  {
    id: "T-1001",
    subject: "Payment processing issue",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Open",
    priority: "High",
    category: "Payment",
    createdAt: "2023-06-10T14:30:00Z",
    lastUpdated: "2023-06-10T16:45:00Z",
    messages: 3,
  },
  {
    id: "T-1002",
    subject: "Cannot upload vehicle photos",
    user: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "In Progress",
    priority: "Medium",
    category: "Technical",
    createdAt: "2023-06-09T10:15:00Z",
    lastUpdated: "2023-06-10T11:20:00Z",
    messages: 5,
  },
  {
    id: "T-1003",
    subject: "Refund request for premium listing",
    user: {
      name: "Michael Smith",
      email: "michael.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Closed",
    priority: "Low",
    category: "Billing",
    createdAt: "2023-06-08T09:45:00Z",
    lastUpdated: "2023-06-09T14:30:00Z",
    messages: 4,
  },
  {
    id: "T-1004",
    subject: "Account verification problem",
    user: {
      name: "Emily Wilson",
      email: "emily.w@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Open",
    priority: "High",
    category: "Account",
    createdAt: "2023-06-10T08:20:00Z",
    lastUpdated: "2023-06-10T09:15:00Z",
    messages: 2,
  },
  {
    id: "T-1005",
    subject: "Question about trade-in value",
    user: {
      name: "Robert Brown",
      email: "robert.b@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Waiting on Customer",
    priority: "Medium",
    category: "Valuation",
    createdAt: "2023-06-07T16:10:00Z",
    lastUpdated: "2023-06-09T10:45:00Z",
    messages: 6,
  },
  {
    id: "T-1006",
    subject: "Vehicle listing not appearing in search",
    user: {
      name: "Jessica Taylor",
      email: "jessica.t@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "In Progress",
    priority: "Medium",
    category: "Technical",
    createdAt: "2023-06-09T13:25:00Z",
    lastUpdated: "2023-06-10T15:30:00Z",
    messages: 3,
  },
  {
    id: "T-1007",
    subject: "Feature request: 360 degree view",
    user: {
      name: "David Miller",
      email: "david.m@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Open",
    priority: "Low",
    category: "Feature Request",
    createdAt: "2023-06-10T11:40:00Z",
    lastUpdated: "2023-06-10T11:40:00Z",
    messages: 1,
  },
  {
    id: "T-1008",
    subject: "Incorrect vehicle information",
    user: {
      name: "Amanda Clark",
      email: "amanda.c@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "Closed",
    priority: "High",
    category: "Data",
    createdAt: "2023-06-08T14:50:00Z",
    lastUpdated: "2023-06-09T16:20:00Z",
    messages: 7,
  },
]

export default function AdminSupport() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("all")

  // Filter tickets
  const filteredTickets = tickets
    .filter((ticket) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          ticket.subject.toLowerCase().includes(query) ||
          ticket.user.name.toLowerCase().includes(query) ||
          ticket.user.email.toLowerCase().includes(query) ||
          ticket.id.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter((ticket) => {
      // Apply status filter
      if (statusFilter === "all") return true
      return ticket.status.toLowerCase().replace(/\s+/g, "-") === statusFilter.toLowerCase()
    })
    .filter((ticket) => {
      // Apply priority filter
      if (priorityFilter === "all") return true
      return ticket.priority.toLowerCase() === priorityFilter.toLowerCase()
    })
    .filter((ticket) => {
      // Apply tab filter
      if (activeTab === "all") return true
      if (activeTab === "open") return ticket.status === "Open" || ticket.status === "In Progress"
      if (activeTab === "waiting") return ticket.status === "Waiting on Customer"
      if (activeTab === "closed") return ticket.status === "Closed"
      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === "updated") return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      if (sortBy === "priority-high") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 }
        return (
          priorityOrder[b.priority as keyof typeof priorityOrder] -
          priorityOrder[a.priority as keyof typeof priorityOrder]
        )
      }
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage customer support inquiries</p>
        </div>
        {/* Update the "New Ticket" button */}
        <Button className="gap-2" asChild>
          <Link href="/admin/support/new">
            <MessageSquare className="h-4 w-4" />
            New Ticket
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="waiting-on-customer">Waiting on Customer</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
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
                <SelectItem value="updated">Recently Updated</SelectItem>
                <SelectItem value="priority-high">Highest Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>{filteredTickets.length} tickets found</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="font-medium">{ticket.id}</div>
                        <div className="text-sm text-muted-foreground">{ticket.subject}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={ticket.user.avatar || "/placeholder.svg"} alt={ticket.user.name} />
                          <AvatarFallback>
                            {ticket.user.name.charAt(0)}
                            {ticket.user.name.split(" ")[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{ticket.user.name}</div>
                          <div className="text-xs text-muted-foreground">{ticket.user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ticket.status === "Open"
                            ? "default"
                            : ticket.status === "In Progress"
                              ? "secondary"
                              : ticket.status === "Waiting on Customer"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {ticket.priority === "High" && <AlertCircle className="h-4 w-4 text-red-500" />}
                        {ticket.priority === "Medium" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                        {ticket.priority === "Low" && <AlertCircle className="h-4 w-4 text-green-500" />}
                        <span>{ticket.priority}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(ticket.lastUpdated).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {/* Update the dropdown menu items to use Link */}
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/support/${ticket.id}`}>
                              <MessageCircle className="mr-2 h-4 w-4" />
                              Reply
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/support/${ticket.id}/assign`}>
                              <User className="mr-2 h-4 w-4" />
                              Assign
                            </Link>
                          </DropdownMenuItem>
                          {ticket.status !== "Closed" ? (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Close Ticket
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Reopen Ticket
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredTickets.length}</span> of{" "}
            <span className="font-medium">{tickets.length}</span> tickets
          </div>
          {/* Update the pagination buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/support?page=2">Next</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
