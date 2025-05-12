"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, MapPin, Phone, Mail, Calendar, BarChart3 } from "lucide-react"

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from your auth provider
  const [user] = useState({
    name: "Mike Agent",
    username: "agent1",
    email: "mike@marketagent.com",
    role: "agent", // Change to "agent" to see the market agent profile
    companyName: "Fresh Foods Co.",
    location: "Chicago, IL",
    bio: "Regional market agent specializing in fresh produce procurement for supermarket chains. Over 8 years of experience working with local farmers.",
    phone: "(555) 987-6543",
    memberSince: "March 2021",
    subscriptionTier: "Pro",
    profileImage: "/placeholder.svg?height=100&width=100",
    website: "www.freshfoodsco.com",
    marketRegions: ["Midwest", "Great Lakes"],
    preferredProducts: ["Vegetables", "Fruits", "Organic Produce"],
    averagePurchaseVolume: "$25,000/month",
  })

  // Mock previous requests data for market agents
  const [previousRequests] = useState([
    {
      id: 1,
      product: "Tomatoes",
      quantity: 200,
      unit: "kg",
      offeredPrice: 2.75,
      deadline: "2023-05-25",
      status: "Open",
      responses: 3,
    },
    {
      id: 2,
      product: "Potatoes",
      quantity: 500,
      unit: "kg",
      offeredPrice: 1.35,
      deadline: "2023-05-28",
      status: "Open",
      responses: 5,
    },
    {
      id: 3,
      product: "Lettuce",
      quantity: 100,
      unit: "kg",
      offeredPrice: 3.5,
      deadline: "2023-05-20",
      status: "Fulfilled",
      responses: 2,
    },
    {
      id: 4,
      product: "Carrots",
      quantity: 300,
      unit: "kg",
      offeredPrice: 1.95,
      deadline: "2023-04-15",
      status: "Expired",
      responses: 1,
    },
    {
      id: 5,
      product: "Apples",
      quantity: 400,
      unit: "kg",
      offeredPrice: 2.25,
      deadline: "2023-04-10",
      status: "Fulfilled",
      responses: 4,
    },
  ])

  // Mock inventory data for farmers
  const [inventory] = useState([
    {
      id: 1,
      product: "Tomatoes",
      quantity: 500,
      unit: "kg",
      harvestDate: "2023-05-10",
      status: "Available",
    },
    {
      id: 2,
      product: "Potatoes",
      quantity: 1200,
      unit: "kg",
      harvestDate: "2023-05-05",
      status: "Available",
    },
    {
      id: 3,
      product: "Carrots",
      quantity: 300,
      unit: "kg",
      harvestDate: "2023-05-08",
      status: "Low Stock",
    },
  ])

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSavePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal and account details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                {user.subscriptionTier}
              </Badge>
            </div>
            <div className="mt-6 w-full space-y-4 text-left">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {user.role === "farmer" ? "Farm Name" : "Company"}
                  </p>
                  <p>{user.role === "farmer" ? user.farmName : user.companyName}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p>{user.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p>{user.memberSince}</p>
                </div>
              </div>
              {user.role === "agent" && (
                <div className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Volume</p>
                    <p>{user.averagePurchaseVolume}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-5 space-y-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={user.location} />
                    </div>
                  </div>

                  {user.role === "farmer" ? (
                    <div className="grid gap-2">
                      <Label htmlFor="farm-name">Farm Name</Label>
                      <Input id="farm-name" defaultValue={user.farmName} />
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue={user.companyName} />
                    </div>
                  )}

                  {user.role === "agent" && (
                    <div className="grid gap-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue={user.website} />
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={user.bio} rows={4} />
                  </div>

                  {user.role === "agent" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="market-regions">Market Regions</Label>
                        <Input id="market-regions" defaultValue={user.marketRegions.join(", ")} />
                        <p className="text-sm text-muted-foreground">Separate regions with commas</p>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="preferred-products">Preferred Products</Label>
                        <Input id="preferred-products" defaultValue={user.preferredProducts.join(", ")} />
                        <p className="text-sm text-muted-foreground">Separate product types with commas</p>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Update your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePassword} className="bg-green-600 hover:bg-green-700">
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for important updates
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="email-notifications" className="sr-only">
                          Email Notifications
                        </Label>
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked
                        />
                      </div>
                    </div>
                    {user.role === "farmer" ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Request Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when new market requests are posted
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="request-alerts" className="sr-only">
                            New Request Alerts
                          </Label>
                          <input
                            type="checkbox"
                            id="request-alerts"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            defaultChecked
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Request Response Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            Get notified when farmers respond to your requests
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="response-alerts" className="sr-only">
                            Request Response Alerts
                          </Label>
                          <input
                            type="checkbox"
                            id="response-alerts"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            defaultChecked
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Price Change Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when official prices change for your products
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="price-alerts" className="sr-only">
                          Price Change Alerts
                        </Label>
                        <input
                          type="checkbox"
                          id="price-alerts"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="marketing-comms" className="sr-only">
                          Marketing Communications
                        </Label>
                        <input
                          type="checkbox"
                          id="marketing-comms"
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>{user.role === "agent" ? "Your Market Requests" : "Your Inventory"}</CardTitle>
                  <CardDescription>
                    {user.role === "agent"
                      ? "View and manage your previous market requests"
                      : "View and manage your current inventory"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.role === "agent" ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Offered Price</TableHead>
                            <TableHead>Deadline</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Responses</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {previousRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="font-medium">{request.product}</TableCell>
                              <TableCell>
                                {request.quantity} {request.unit}
                              </TableCell>
                              <TableCell>
                                ${request.offeredPrice.toFixed(2)}/{request.unit}
                              </TableCell>
                              <TableCell>{request.deadline}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    request.status === "Open"
                                      ? "bg-blue-50 text-blue-700"
                                      : request.status === "Fulfilled"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-gray-50 text-gray-700"
                                  }`}
                                >
                                  {request.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{request.responses}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Harvest Date</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {inventory.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.product}</TableCell>
                              <TableCell>
                                {item.quantity} {item.unit}
                              </TableCell>
                              <TableCell>{item.harvestDate}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    item.status === "Available"
                                      ? "bg-green-50 text-green-700"
                                      : item.status === "Low Stock"
                                        ? "bg-yellow-50 text-yellow-700"
                                        : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  {item.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="bg-green-600 hover:bg-green-700">
                    {user.role === "agent" ? "Create New Request" : "Add Inventory Item"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
