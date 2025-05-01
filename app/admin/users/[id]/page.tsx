"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Calendar,
  Shield,
  Ban,
  CheckCircle,
  Car,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Sample user data
const userData = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "User",
  status: "Active",
  joinDate: "2023-01-15",
  lastLogin: "2023-06-10T14:30:00Z",
  avatar: "/placeholder.svg?height=128&width=128",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Car enthusiast looking for my next dream vehicle.",
  vehicles: [
    { id: "1", name: "2023 Tesla Model S", status: "Listed", date: "2023-05-20" },
    { id: "2", name: "2020 BMW 3 Series", status: "Sold", date: "2023-03-15" },
  ],
  activity: [
    { id: "1", action: "Listed a vehicle", description: "2023 Tesla Model S", date: "2023-05-20T10:30:00Z" },
    { id: "2", action: "Updated profile", description: "Changed profile picture", date: "2023-04-12T15:45:00Z" },
    { id: "3", action: "Sold a vehicle", description: "2020 BMW 3 Series", date: "2023-03-15T09:20:00Z" },
    { id: "4", action: "Created account", description: "User registration", date: "2023-01-15T11:10:00Z" },
  ],
  supportTickets: [
    { id: "T-1001", subject: "Payment processing issue", status: "Open", date: "2023-06-10T14:30:00Z" },
    { id: "T-1002", subject: "Cannot upload vehicle photos", status: "Closed", date: "2023-05-05T10:15:00Z" },
  ],
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<typeof userData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch user details
    const fetchUser = async () => {
      setIsLoading(true)

      // In a real app, you would fetch from an API
      // For demo, we'll use the sample data

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser(userData)
      setIsLoading(false)
    }

    fetchUser()
  }, [params.id])

  const handleDelete = async () => {
    setIsDeleting(true)

    // Simulate API call to delete user
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsDeleting(false)
    router.push("/admin?tab=users")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="h-10 w-10 text-primary mx-auto animate-pulse" />
          <h2 className="mt-4 text-xl font-semibold">Loading user details...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Ban className="h-10 w-10 text-destructive mx-auto" />
          <h2 className="mt-4 text-xl font-semibold">User not found</h2>
          <p className="mt-2 text-muted-foreground">The user you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" asChild>
            <Link href="/admin?tab=users">Back to Users</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin?tab=users">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/users/${user.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting || showDeleteConfirm}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {showDeleteConfirm ? (
          <Card className="max-w-md mx-auto border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Confirm Deletion</CardTitle>
              <CardDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Yes, Delete User"}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-1/3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="text-2xl">
                          {user.name.charAt(0)}
                          {user.name.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-muted-foreground">{user.email}</p>
                      <div className="mt-2">
                        <Badge
                          variant={user.role === "Admin" ? "default" : user.role === "Dealer" ? "secondary" : "outline"}
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <Badge
                          variant={
                            user.status === "Active"
                              ? "outline"
                              : user.status === "Inactive"
                                ? "secondary"
                                : "destructive"
                          }
                          className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>{user.role}</span>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/admin/users/${user.id}/edit`}>Edit Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-2/3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Full Name</p>
                            <p className="font-medium">{user.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-medium">{user.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{user.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Join Date</p>
                            <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Login</p>
                            <p className="font-medium">{new Date(user.lastLogin).toLocaleString()}</p>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Bio</p>
                          <p>{user.bio}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Vehicles</CardTitle>
                        <CardDescription>Vehicles listed or purchased by this user</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Car className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium">{vehicle.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(vehicle.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Badge variant={vehicle.status === "Listed" ? "outline" : "secondary"}>
                                {vehicle.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/admin?tab=vehicles">View All Vehicles</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>

                  <TabsContent value="activity" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Activity</CardTitle>
                        <CardDescription>Recent actions performed by this user</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.activity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-3 border rounded-lg">
                              <div className="bg-primary/10 p-2 rounded-full mt-1">
                                {activity.action.includes("Listed") && <Car className="h-4 w-4 text-primary" />}
                                {activity.action.includes("Updated") && <Edit className="h-4 w-4 text-primary" />}
                                {activity.action.includes("Sold") && <CheckCircle className="h-4 w-4 text-primary" />}
                                {activity.action.includes("Created") && <User className="h-4 w-4 text-primary" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium">{activity.action}</h4>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                              </div>
                              <div className="text-xs text-muted-foreground whitespace-nowrap">
                                {new Date(activity.date).toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="support" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Support Tickets</CardTitle>
                        <CardDescription>Support inquiries from this user</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.supportTickets.map((ticket) => (
                            <div key={ticket.id} className="flex items-start justify-between p-3 border rounded-lg">
                              <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-primary mt-1" />
                                <div>
                                  <p className="font-medium">{ticket.subject}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {ticket.id} • {new Date(ticket.date).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <Badge variant={ticket.status === "Open" ? "default" : "secondary"}>
                                {ticket.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/admin?tab=support">View All Support Tickets</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
