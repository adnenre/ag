"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, Calendar, User, Ruler, Map } from "lucide-react"

// Generate mock farm data
const generateFarmData = (id) => {
  // Extract farm number from id
  const farmNumber = id.split("-")[1]

  // Generate random data
  const products = ["tomatoes", "potatoes", "onions", "olives", "dates"]
  const randomProducts = []
  const productCount = Math.floor(Math.random() * 3) + 1 // 1-3 products

  for (let i = 0; i < productCount; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    if (!randomProducts.includes(randomProduct)) {
      randomProducts.push(randomProduct)
    }
  }

  const locations = ["Béja", "Sidi Bouzid", "Kairouan", "Nabeul", "Gafsa"]
  const location = locations[Math.floor(Math.random() * locations.length)]

  const size = Math.floor(Math.random() * 50) + 5 // Farm size in hectares
  const established = 2000 + Math.floor(Math.random() * 23) // Year established between 2000-2023

  // Generate random requests
  const requests = []
  const requestCount = Math.floor(Math.random() * 5) + 1 // 1-5 requests

  for (let i = 0; i < requestCount; i++) {
    const governorates = ["g_Tunis", "g_Sousse", "g_Sfax", "g_Bizerte", "g_Nabeul"]
    const governorateId = governorates[Math.floor(Math.random() * governorates.length)]
    const governorateNames = {
      g_Tunis: "Tunis",
      g_Sousse: "Sousse",
      g_Sfax: "Sfax",
      g_Bizerte: "Bizerte",
      g_Nabeul: "Nabeul",
    }

    requests.push({
      id: `traffic-${id}-${governorateId}`,
      product: randomProducts[Math.floor(Math.random() * randomProducts.length)],
      volume: Math.floor(Math.random() * 100) + 10,
      price: Math.floor(Math.random() * 50) + 10,
      deadline: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: ["open", "accepted", "fulfilled"][Math.floor(Math.random() * 3)],
      governorateId,
      governorateName: governorateNames[governorateId],
    })
  }

  return {
    id,
    name: `Farm ${farmNumber}`,
    owner: `Farmer ${farmNumber}`,
    location,
    size,
    established,
    products: randomProducts,
    requests,
    description:
      "This farm specializes in sustainable agricultural practices, producing high-quality crops for local and regional markets. The farm employs modern farming techniques while respecting traditional knowledge.",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
  }
}

export default function FarmDetailsPage({ params }) {
  const router = useRouter()
  const { t } = useLanguage()
  const [farm, setFarm] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the farm data from your API
    // For now, we'll generate mock data
    const farmData = generateFarmData(params.id)
    setFarm(farmData)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t("loading", "general")}</h2>
        </div>
      </div>
    )
  }

  if (!farm) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t("farmNotFound", "admin")}</h2>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "text-blue-500"
      case "accepted":
        return "text-green-500"
      case "fulfilled":
        return "text-purple-500"
      case "declined":
        return "text-red-500"
      case "expired":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToMap", "admin")}
        </Button>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{farm.name}</h2>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("overview", "dashboard")}</TabsTrigger>
          <TabsTrigger value="products">{t("products", "admin")}</TabsTrigger>
          <TabsTrigger value="requests">{t("requests", "navigation")}</TabsTrigger>
          <TabsTrigger value="gallery">{t("gallery", "admin")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("farmDetails", "admin")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t("owner", "admin")}</p>
                    <p>{farm.owner}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t("farmLocation", "admin")}</p>
                    <p>{farm.location}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Ruler className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t("farmSize", "admin")}</p>
                    <p>
                      {farm.size} {t("hectares", "admin")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t("yearEstablished", "admin")}</p>
                    <p>{farm.established}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("farmProducts", "admin")}</CardTitle>
                <CardDescription>{t("currentlyGrowing", "admin")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {farm.products.map((product) => (
                    <div key={product} className="flex items-center p-2 border rounded-md">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: getProductColor(product) }}
                      ></div>
                      <span>{t(product, "admin")}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("description", "general")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{farm.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("actions", "general")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">{t("contactFarm", "admin")}</Button>
                <Button variant="outline">{t("viewInventory", "admin")}</Button>
                <Button variant="outline" onClick={() => router.push("/admin/traffic-map")}>
                  <Map className="mr-2 h-4 w-4" />
                  {t("viewOnMap", "admin")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("farmProducts", "admin")}</CardTitle>
              <CardDescription>{t("detailedProductInfo", "admin")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {farm.products.map((product) => (
                  <Card key={product}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{t(product, "admin")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2 md:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium">{t("averageYield", "admin")}</p>
                          <p className="text-sm">
                            {Math.floor(Math.random() * 20) + 5} {t("tons", "admin")}/{t("hectares", "admin")}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t("harvestSeason", "admin")}</p>
                          <p className="text-sm">
                            {["Spring", "Summer", "Fall", "Winter"][Math.floor(Math.random() * 4)]}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{t("currentStatus", "admin")}</p>
                          <p className="text-sm">
                            {["Growing", "Harvesting", "Planting"][Math.floor(Math.random() * 3)]}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("requestsAndOffers", "admin")}</CardTitle>
              <CardDescription>{t("currentAndPastRequests", "admin")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {farm.requests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getProductColor(request.product) }}
                      ></div>
                      <div>
                        <p className="font-medium">{t(request.product, "admin")}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.volume} {t("tons", "admin")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={getStatusColor(request.status)}>{t(request.status, "requests")}</p>
                      <p className="text-sm text-muted-foreground">{request.governorateName}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/admin/requests/${request.id}`)}>
                      {t("viewDetails", "requests")}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("farmGallery", "admin")}</CardTitle>
              <CardDescription>{t("imagesOfFarm", "admin")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {farm.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-md">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Farm ${index + 1}`}
                      className="h-auto w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Function to get color based on product
function getProductColor(productName) {
  const colors = {
    tomatoes: "#e53935",
    potatoes: "#8d6e63",
    onions: "#9575cd",
    olives: "#7cb342",
    dates: "#ff8f00",
  }
  return colors[productName] || "#2196f3"
}
