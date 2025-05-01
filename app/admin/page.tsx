"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Car, Users, BarChart3, Settings, MessageSquare, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminDashboard from "@/components/admin/admin-dashboard"
import VehicleManagement from "@/components/admin/vehicle-management"
import UserManagement from "@/components/admin/user-management"
import AdminAnalytics from "@/components/admin/admin-analytics"
import AdminSettings from "@/components/admin/admin-settings"
import AdminSupport from "@/components/admin/admin-support"
// Update the imports to include Link from next/link
import Link from "next/link"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const router = useRouter()

  // In a real app, you would check for authentication here
  // and redirect unauthenticated users to the login page
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    setIsAuthenticated(false)
    router.push("/")
  }

  // Add useEffect to handle URL query parameters for tab selection
  // Add this after the useState declarations
  React.useEffect(() => {
    // Get the tab from URL query parameters
    const params = new URLSearchParams(window.location.search)
    const tabParam = params.get("tab")

    // Set the active tab if a valid tab is provided in the URL
    if (tabParam && ["dashboard", "vehicles", "users", "analytics", "support", "settings"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-muted/50 border-r h-screen sticky top-0">
        <div className="p-4 border-b flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        {/* Update the sidebar navigation buttons to use Link */}
        <nav className="flex-1 p-4 space-y-1">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("dashboard")}
            asChild={activeTab !== "dashboard"}
          >
            {activeTab !== "dashboard" ? (
              <Link href="/admin?tab=dashboard">
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </>
            )}
          </Button>
          <Button
            variant={activeTab === "vehicles" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("vehicles")}
            asChild={activeTab !== "vehicles"}
          >
            {activeTab !== "vehicles" ? (
              <Link href="/admin?tab=vehicles">
                <Car className="mr-2 h-4 w-4" />
                Vehicles
              </Link>
            ) : (
              <>
                <Car className="mr-2 h-4 w-4" />
                Vehicles
              </>
            )}
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("users")}
            asChild={activeTab !== "users"}
          >
            {activeTab !== "users" ? (
              <Link href="/admin?tab=users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </Link>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Users
              </>
            )}
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("analytics")}
            asChild={activeTab !== "analytics"}
          >
            {activeTab !== "analytics" ? (
              <Link href="/admin?tab=analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            ) : (
              <>
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </>
            )}
          </Button>
          <Button
            variant={activeTab === "support" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("support")}
            asChild={activeTab !== "support"}
          >
            {activeTab !== "support" ? (
              <Link href="/admin?tab=support">
                <MessageSquare className="mr-2 h-4 w-4" />
                Support
              </Link>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Support
              </>
            )}
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("settings")}
            asChild={activeTab !== "settings"}
          >
            {activeTab !== "settings" ? (
              <Link href="/admin?tab=settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            ) : (
              <>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </>
            )}
          </Button>
        </nav>

        {/* Update the logout button to use Link */}
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Admin</span>
            </div>
            {/* Update the mobile header tabs to use Link */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-xs">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="dashboard" className="px-2" asChild>
                  <Link href="/admin?tab=dashboard">
                    <BarChart3 className="h-4 w-4" />
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="vehicles" className="px-2" asChild>
                  <Link href="/admin?tab=vehicles">
                    <Car className="h-4 w-4" />
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="users" className="px-2" asChild>
                  <Link href="/admin?tab=users">
                    <Users className="h-4 w-4" />
                  </Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {/* Update the mobile logout button to use Link */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "vehicles" && <VehicleManagement />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "analytics" && <AdminAnalytics />}
          {activeTab === "support" && <AdminSupport />}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  )
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any login
    // In a real app, you would validate credentials against a backend
    if (email && password) {
      onLogin()
    } else {
      setError("Please enter both email and password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md p-8 space-y-8 bg-background rounded-lg border shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Car className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">AutoX Neo</h2>
          </div>
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to access the admin dashboard</p>
        </div>

        {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@autoxneo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  )
}
