"use client"

import { useState } from "react"
import {
  Settings,
  Save,
  Globe,
  Bell,
  Shield,
  Database,
  Mail,
  CreditCard,
  FileText,
  Upload,
  Check,
  Car,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    setSaveSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage platform settings and configurations</p>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>Saving...</>
          ) : saveSuccess ? (
            <>
              <Check className="h-4 w-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden md:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="AutoX Neo" />
                <p className="text-sm text-muted-foreground">The name of your platform as it appears to users</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  defaultValue="AI-powered, immersive, and trust-first platform for buying, selling, and financing cars — personalized, predictive, and global."
                />
                <p className="text-sm text-muted-foreground">
                  A brief description of your platform for SEO and marketing
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="contact@autoxneo.com" />
                <p className="text-sm text-muted-foreground">The primary contact email for your platform</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input id="support-phone" type="tel" defaultValue="1-800-AUTO-NEO" />
                <p className="text-sm text-muted-foreground">The customer support phone number</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <Switch id="maintenance-mode" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode to temporarily disable the site for updates
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" defaultValue="AutoX Neo Inc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Textarea id="business-address" defaultValue="1234 Auto Boulevard, New York, NY 10036, United States" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID / EIN</Label>
                <Input id="tax-id" defaultValue="12-3456789" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how your platform looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border flex items-center justify-center bg-muted">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload New Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded border flex items-center justify-center bg-muted">
                    <Car className="h-4 w-4 text-primary" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload New Favicon
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary"></div>
                  <Input type="color" defaultValue="#FF6B00" className="w-16 h-10" />
                  <Input defaultValue="#FF6B00" className="w-32" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary"></div>
                  <Input type="color" defaultValue="#FFF4EB" className="w-16 h-10" />
                  <Input defaultValue="#FFF4EB" className="w-32" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Allow users to switch between light and dark mode</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system and user notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-user-email">New User Registration</Label>
                    <Switch id="new-user-email" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Send email notification when a new user registers</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-listing-email">New Vehicle Listing</Label>
                    <Switch id="new-listing-email" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Send email notification when a new vehicle is listed</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-sale-email">New Sale Completed</Label>
                    <Switch id="new-sale-email" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Send email notification when a sale is completed</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Notifications</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <Switch id="system-alerts" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about system performance and issues
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <Switch id="security-alerts" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about security events and issues
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input id="notification-email" type="email" defaultValue="admin@autoxneo.com" />
                <p className="text-sm text-muted-foreground">Email address to receive admin notifications</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Require two-factor authentication for admin accounts</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-complexity">Password Complexity Requirements</Label>
                    <Switch id="password-complexity" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Enforce strong password requirements for all users</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" min="5" max="120" />
                  <p className="text-sm text-muted-foreground">
                    Time in minutes before an inactive session is terminated
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="force-logout">Force Logout on Password Change</Label>
                    <Switch id="force-logout" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out users when they change their password
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Security</h3>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" type="password" defaultValue="sk_live_51NxXXXXXXXXXXXXXXXXXXXXXX" readOnly />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Your API key for external integrations</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="api-rate-limiting">API Rate Limiting</Label>
                    <Switch id="api-rate-limiting" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">Limit the number of API requests to prevent abuse</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Configure third-party service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Processors</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <Label htmlFor="stripe-integration">Stripe</Label>
                    </div>
                    <Switch id="stripe-integration" defaultChecked />
                  </div>
                  <div className="space-y-2 pl-7">
                    <Label htmlFor="stripe-key">API Key</Label>
                    <Input id="stripe-key" type="password" defaultValue="sk_live_51NxXXXXXXXXXXXXXXXXXXXXXX" />
                    <p className="text-xs text-muted-foreground">Your Stripe secret key for payment processing</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <Label htmlFor="paypal-integration">PayPal</Label>
                    </div>
                    <Switch id="paypal-integration" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Services</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <Label htmlFor="sendgrid-integration">SendGrid</Label>
                    </div>
                    <Switch id="sendgrid-integration" defaultChecked />
                  </div>
                  <div className="space-y-2 pl-7">
                    <Label htmlFor="sendgrid-key">API Key</Label>
                    <Input id="sendgrid-key" type="password" defaultValue="SG.XXXXXXXXXXXXXXXXXXXXXXXX" />
                    <p className="text-xs text-muted-foreground">Your SendGrid API key for email delivery</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Analytics</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <Label htmlFor="google-analytics">Google Analytics</Label>
                    </div>
                    <Switch id="google-analytics" defaultChecked />
                  </div>
                  <div className="space-y-2 pl-7">
                    <Label htmlFor="ga-tracking-id">Tracking ID</Label>
                    <Input id="ga-tracking-id" defaultValue="G-XXXXXXXXXX" />
                    <p className="text-xs text-muted-foreground">Your Google Analytics tracking ID</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Maps & Location</h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <Label htmlFor="google-maps">Google Maps</Label>
                    </div>
                    <Switch id="google-maps" defaultChecked />
                  </div>
                  <div className="space-y-2 pl-7">
                    <Label htmlFor="maps-api-key">API Key</Label>
                    <Input id="maps-api-key" type="password" defaultValue="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
                    <p className="text-xs text-muted-foreground">Your Google Maps API key for location services</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
