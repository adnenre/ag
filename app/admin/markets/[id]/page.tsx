"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, BarChart, Users, Map } from "lucide-react"

// Generate mock market data
const generateMarketData = (id) => {
  // Define governorates
  const governorates = {
    g_Tunis: { name: "Tunis" },
    g_Ariana: { name: "Ariana" },
    g_Ben_Arous: { name: "Ben Arous" },
    g_Manouba: { name: "Manouba" },
    g_Beja: { name: "Béja" },
    g_Nabeul: { name: "Nabeul" },
    g_Bizerte: { name: "Bizerte" },
    g_Jendouba: { name: "Jendouba" },
    g_Kef: { name: "Kef" },
    g_Seliana: { name: "Seliana" },
    g_Sousse: { name: "Sousse" },
    g_Monastir: { name: "Monastir" },
    g_Mahdia: { name: "Mahdia" },
    g_Sfax: { name: "Sfax" },
    g_Kairouan: { name: "Kairouan" },
    g_Kasserine: { name: "Kasserine" },
    g_SidiBouzid: { name: "Sidi Bouzid" },
    g_Gabes: { name: "Gabes" },
    g_Mednine: { name: "Medenine" },
    g_Tataouin: { name: "Tataouine" },
    g_Gafsa: { name: "Gafsa" },
    g_Tozer: { name: "Tozeur" },
    g_Kebili: { name: "Kebili" },
    g_Zaghouan: { name: "Zaghouan" },
  }

  // Get governorate name
  const governorateName = governorates[id]?.name || "Unknown"

  // Generate random data
  const products = ["tomatoes", "potatoes", "onions", "olives", "dates"]
  const topProducts = []
  const productCount = Math.floor(Math.random() * 3) + 2 // 2-4 products

  for (let i = 0; i < productCount; i++) {
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    if (!topProducts.includes(randomProduct)) {
      topProducts.push(randomProduct)
    }
  }

  // Generate random requests
  const requests = []
  const requestCount = Math.floor(Math.random() * 8) + 3 // 3-10 requests

  for (let i = 0; i < requestCount; i++) {
    const farmId = `farm-${Math.floor(Math.random() * 100)}`

    requests.push({
      id: `traffic-${farmId}-${id}`,
      farmId,
      farmName: `Farm ${farmId.split("-")[1]}`,
      product: products[Math.floor(Math.random() * products.length)],
      volume: Math.floor(Math.random() * 100) + 10,
      price: Math.floor(Math.random() * 50) + 10,
      deadline: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: ["open", "accepted", "fulfilled"][Math.floor(Math.random() * 3)],
    })
  }

  // Generate connected farms
  const connectedFarms = []
  const farmCount = Math.floor(Math.random() * 10) + 5 // 5-14 farms

  for (let i = 0; i < farmCount; i++) {
    const farmId = `farm-${Math.floor(Math.random() * 100)}`

    if (!connectedFarms.some((farm) => farm.id === farmId)) {
      connectedFarms.push({
        id: farmId,
        name: `Farm ${farmId.split("-")[1]}`,
        products: [products[Math.floor(Math.random() * products.length)]],
        volume: Math.floor(Math.random() * 500) + 100,
      })
    }
  }

  return {
    id,
    name: governorateName,
    population: Math.floor(Math.random() * 500000) + 100000,
    tradingVolume: Math.floor(Math.random() * 10000) + 1000,
    topProducts,
    requests,
    connectedFarms,
    description: `${governorateName} is a major agricultural market hub in Tunisia, connecting local farmers with regional and national buyers. The market specializes in facilitating trade of fresh produce and supporting the local agricultural economy.`,
    images: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
  }
}

export default function MarketDetailsPage({ params }) {
  const router = useRouter()
  const { t } = useLanguage()
  const [market, setMarket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the market data from your API
    // For now, we'll generate mock data
    const marketData = generateMarketData(params.id)
    setMarket(marketData)
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

  if (!market) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t("marketNotFound", "admin")}</h2>
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
        <h2 className="text-3xl font-bold tracking-tight">
          {market.name} {t("market", "admin")}
        </h2>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("overview", "dashboard")}</TabsTrigger>
          <TabsTrigger value="requests">{t("requests", "navigation")}</TabsTrigger>
          <TabsTrigger value="farms">{t("connectedFarms", "admin")}</TabsTrigger>
          <TabsTrigger value="gallery">{t("gallery", "admin")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("marketDetails", "admin")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t("location", "general")}</p>
                    <p>{market.name}, Tunisia</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t("population", "admin")}</p>
                    <p>{market.population.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{t("tradingVolume", "admin")}</p>
                    <p>
                      {market.tradingVolume.toLocaleString()} {t("tons", "admin")}/{t("year", "admin")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("topProducts", "admin")}</CardTitle>
                <CardDescription>{t("mostTradedProducts", "admin")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {market.topProducts.map((product) => (
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
              <p>{market.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("actions", "general")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">{t("createRequest", "requests")}</Button>
                <Button variant="outline">{t("viewPriceHistory", "admin")}</Button>
                <Button variant="outline" onClick={() => router.push("/admin/traffic-map")}>
                  <Map className="mr-2 h-4 w-4" />
                  {t("viewOnMap", "admin")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("marketRequests", "admin")}</CardTitle>
              <CardDescription>{t("currentAndPastRequests", "admin")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {market.requests.map((request) => (
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
                      <p className="text-sm text-muted-foreground">{request.farmName}</p>
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

        <TabsContent value="farms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("connectedFarms", "admin")}</CardTitle>
              <CardDescription>{t("farmsConnectedToMarket", "admin")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {market.connectedFarms.map((farm) => (
                  <div key={farm.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <p className="font-medium">{farm.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {farm.products.map((p) => t(p, "admin")).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {farm.volume} {t("tons", "admin")}/{t("year", "admin")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/admin/farms/${farm.id}`)}>
                      {t("viewFarm", "admin")}
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
              <CardTitle>{t("marketGallery", "admin")}</CardTitle>
              <CardDescription>{t("imagesOfMarket", "admin")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {market.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-md">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Market ${index + 1}`}
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
