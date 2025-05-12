"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, ShoppingBasket, FileText, Users, Calendar, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  // Mock user data - in a real app, this would come from your auth provider
  const [userRole] = useState("farmer") // or "agent"

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>{userRole === "farmer" ? "Add Inventory Item" : "Create New Request"}</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {userRole === "farmer" ? "Total Inventory" : "Active Requests"}
                </CardTitle>
                <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {userRole === "farmer" ? "Pending Requests" : "Connected Farmers"}
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {userRole === "farmer" ? "Completed Sales" : "Fulfilled Requests"}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+1 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">Renews in 24 days</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{userRole === "farmer" ? "Inventory Overview" : "Request Activity"}</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16" />
                  <span className="ml-2">Chart visualization would go here</span>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{userRole === "farmer" ? "Recent Requests" : "Recent Connections"}</CardTitle>
                <CardDescription>
                  {userRole === "farmer" ? "You have 6 new market requests" : "You have 4 new farmer connections"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userRole === "farmer" ? `Market Request #${i}` : `Farmer Connection #${i}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {userRole === "farmer" ? "Tomatoes - 100kg" : "John Doe - Vegetable Farmer"}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {userRole === "farmer" ? `$${(i * 2.5).toFixed(2)}/kg` : "Connected"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={userRole === "farmer" ? "/requests" : "/connections"}>
                    View all
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="h-[400px] flex items-center justify-center text-muted-foreground">
          Analytics content would go here
        </TabsContent>

        <TabsContent value="reports" className="h-[400px] flex items-center justify-center text-muted-foreground">
          Reports content would go here
        </TabsContent>

        <TabsContent value="notifications" className="h-[400px] flex items-center justify-center text-muted-foreground">
          Notifications content would go here
        </TabsContent>
      </Tabs>
    </div>
  )
}
