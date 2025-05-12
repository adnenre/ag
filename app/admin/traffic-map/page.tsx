"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import TrafficMap from "@/components/admin/traffic-map"

export default function TrafficMapPage() {
  const { t } = useLanguage()
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedView, setSelectedView] = useState("requests")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("trafficMap", "admin")}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("requestOfferTraffic", "admin")}</CardTitle>
          <CardDescription>{t("trafficMapDescription", "admin")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <Label htmlFor="product-filter">{t("product", "general")}</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger id="product-filter">
                  <SelectValue placeholder={t("selectProduct", "admin")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allProducts", "admin")}</SelectItem>
                  <SelectItem value="tomatoes">{t("tomatoes", "admin")}</SelectItem>
                  <SelectItem value="potatoes">{t("potatoes", "admin")}</SelectItem>
                  <SelectItem value="onions">{t("onions", "admin")}</SelectItem>
                  <SelectItem value="olives">{t("olives", "admin")}</SelectItem>
                  <SelectItem value="dates">{t("dates", "admin")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/3">
              <Label htmlFor="period-filter">{t("period", "admin")}</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger id="period-filter">
                  <SelectValue placeholder={t("selectPeriod", "admin")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">{t("lastWeek", "admin")}</SelectItem>
                  <SelectItem value="month">{t("lastMonth", "admin")}</SelectItem>
                  <SelectItem value="quarter">{t("lastQuarter", "admin")}</SelectItem>
                  <SelectItem value="year">{t("lastYear", "admin")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/3">
              <Label>{t("viewType", "admin")}</Label>
              <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="requests">{t("requests", "navigation")}</TabsTrigger>
                  <TabsTrigger value="offers">{t("offers", "admin")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <TrafficMap product={selectedProduct} period={selectedPeriod} viewType={selectedView} />

          <div className="mt-4 text-sm text-muted-foreground">
            <p>{t("mapNote", "admin")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
