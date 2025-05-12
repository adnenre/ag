"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, DollarSign, Scale, ArrowRightLeft, Map } from "lucide-react"

// Generate mock request data
const generateRequestData = (id) => {
  // Extract farm ID and governorate ID from the traffic ID
  const [_, farmId, governorateId] = id.split("-")

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

  // Extract farm number from farmId
  const farmNumber = farmId.split("-")[1]

  // Generate random data
  const products = ["tomatoes", "potatoes", "onions", "olives", "dates"]
  const product = products[Math.floor(Math.random() * products.length)]
  const volume = Math.floor(Math.random() * 100) + 10
  const price = Math.floor(Math.random() * 50) + 10
  const deadline = new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]
  const statuses = ["open", "accepted", "fulfilled"]
  const status = statuses[Math.floor(Math.random() * statuses.length)]

  return {
    id,
    farmId,
    farmName: `Farm ${farmNumber}`,
    governorateId,
    governorateName: governorates[governorateId]?.name || "Unknown",
    product,
    volume,
    price,
    deadline,
    status,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    notes:
      "This is a request for high-quality produce to meet market demand. Please ensure timely delivery and adherence to quality standards.",
  }
}

export default function RequestDetailsPage({ params }) {
  const router = useRouter()
  const { t } = useLanguage()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the request data from your API
    // For now, we'll generate mock data
    const requestData = generateRequestData(params.id)
    setRequest(requestData)
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

  if (!request) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{t("requestNotFound", "admin")}</h2>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-blue-500"
      case "accepted":
        return "bg-green-500"
      case "fulfilled":
        return "bg-purple-500"
      case "declined":
        return "bg-red-500"
      case "expired":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
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
        <h2 className="text-3xl font-bold tracking-tight">{t("requestDetails", "admin")}</h2>
        <Badge className={getStatusColor(request.status)}>{t(request.status, "requests")}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("requestInformation", "admin")}</CardTitle>
            <CardDescription>
              {t("requestCreatedOn", "admin")}: {request.createdAt}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <ArrowRightLeft className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t("product", "general")}</p>
                <p>{t(request.product, "admin")}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Scale className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t("requestVolume", "admin")}</p>
                <p>
                  {request.volume} {t("tons", "admin")}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t("requestPrice", "admin")}</p>
                <p>
                  ${request.price}/{t("unit", "general")}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{t("requestDeadline", "admin")}</p>
                <p>{request.deadline}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("routeInformation", "admin")}</CardTitle>
            <CardDescription>
              {t("fromMarket", "admin")} → {t("toFarm", "admin")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">{t("fromMarket", "admin")}</p>
                <p>{request.governorateName}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">{t("toFarm", "admin")}</p>
                <p>{request.farmName}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium mb-2">{t("additionalNotes", "requests")}</p>
              <p className="text-sm text-muted-foreground">{request.notes}</p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => router.push(`/admin/farms/${request.farmId}`)}>
                <MapPin className="mr-2 h-4 w-4" />
                {t("viewFarm", "admin")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/admin/markets/${request.governorateId}`)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {t("viewMarket", "admin")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("actions", "general")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">{t("updateStatus", "admin")}</Button>
            <Button variant="outline">{t("contactFarm", "admin")}</Button>
            <Button variant="outline">{t("contactMarket", "admin")}</Button>
            <Button variant="outline" onClick={() => router.push("/admin/traffic-map")}>
              <Map className="mr-2 h-4 w-4" />
              {t("viewOnMap", "admin")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
