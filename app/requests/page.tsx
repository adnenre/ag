"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  MessageSquare,
  CheckCircle,
  XCircle,
  ChevronRight,
  PlusCircle,
  Edit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";

// Mock market requests data
const allMarketRequestsData = [
  {
    id: 1,
    agent: "Marché de gros Bir el Kasaa",
    product: "Tomatoes",
    quantity: 200,
    unit: "kg",
    medianPrice: 2.5,
    offeredPrice: 2.75,
    officialPrice: 2.45,
    deadline: "2023-05-25",
    status: "Open",
    agentId: "agent2",
  },
  {
    id: 2,
    agent: "Marché de gros Bir el Kasaa",
    product: "Potatoes",
    quantity: 500,
    unit: "kg",
    medianPrice: 1.2,
    offeredPrice: 1.35,
    officialPrice: 1.15,
    deadline: "2023-05-28",
    status: "Open",
    agentId: "agent1",
  },
  {
    id: 3,
    agent: "Marché de gros Bir el Kasaa",
    product: "Carrots",
    quantity: 150,
    unit: "kg",
    medianPrice: 1.8,
    offeredPrice: 1.95,
    officialPrice: 1.75,
    deadline: "2023-05-22",
    status: "Open",
    agentId: "agent3",
  },
  {
    id: 4,
    agent: "Marché de gros Bir el Kasaa",
    product: "Lettuce",
    quantity: 100,
    unit: "kg",
    medianPrice: 3.2,
    offeredPrice: 3.5,
    officialPrice: 3.1,
    deadline: "2023-05-20",
    status: "Open",
    agentId: "agent1",
  },
  {
    id: 5,
    agent: "Marché de gros Bir el Kasaa",
    product: "Onions",
    quantity: 300,
    unit: "kg",
    medianPrice: 1.4,
    offeredPrice: 1.55,
    officialPrice: 1.35,
    deadline: "2023-05-30",
    status: "Open",
    agentId: "agent4",
  },
  {
    id: 6,
    agent: "Marché de gros Bir el Kasaa",
    product: "Apples",
    quantity: 400,
    unit: "kg",
    medianPrice: 2.2,
    offeredPrice: 2.45,
    officialPrice: 2.15,
    deadline: "2023-06-05",
    status: "Open",
    agentId: "agent1",
  },
  {
    id: 7,
    agent: "Marché de gros Bir el Kasaa",
    product: "Oranges",
    quantity: 250,
    unit: "kg",
    medianPrice: 2.5,
    offeredPrice: 2.65,
    officialPrice: 2.4,
    deadline: "2023-06-10",
    status: "Open",
    agentId: "agent1",
  },
  {
    id: 8,
    agent: "Marché de gros Bir el Kasaa",
    product: "Bananas",
    quantity: 300,
    unit: "kg",
    medianPrice: 1.8,
    offeredPrice: 1.95,
    officialPrice: 1.75,
    deadline: "2023-05-15",
    status: "Fulfilled",
    agentId: "agent1",
  },
];

export default function RequestsPage() {
  const { t } = useLanguage();

  // Mock current user - in a real app, this would come from your auth provider
  const [currentUser] = useState({
    id: "farmer1",
    role: "farmer", // Change to "agent" to see agent view
    agentId: "agent1", // Only relevant if role is "agent"
  });

  const [requests] = useState(allMarketRequestsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openCards, setOpenCards] = useState({});
  const [activeTab, setActiveTab] = useState(
    currentUser.role === "agent" ? "my-requests" : "all-requests"
  );

  // Filter requests based on search query and active tab
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.agent.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "my-requests" && currentUser.role === "agent") {
      return matchesSearch && request.agentId === currentUser.agentId;
    }

    return matchesSearch;
  });

  const toggleCard = (id) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("title", "requests")}
        </h2>
        {currentUser.role === "agent" && (
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="mr-2 h-4 w-4 rtl-mirror" />
            {t("createRequest", "requests")}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("title", "requests")}</CardTitle>
          <CardDescription>{t("subtitle", "requests")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4 md:gap-0">
            <div className="flex items-center w-full md:w-auto space-x-2">
              <Input
                placeholder={t("searchRequests", "requests")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9"
              />
              <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
                <Search className="h-4 w-4" />
                <span className="sr-only">{t("search", "general")}</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-2 lg:px-3"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">{t("filter", "general")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {t("filterByStatus", "admin")}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{t("all", "general")}</DropdownMenuItem>
                  <DropdownMenuItem>{t("open", "requests")}</DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("accepted", "requests")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("declined", "requests")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {currentUser.role === "agent" && (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full md:w-auto"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="my-requests">
                    {t("myRequests", "requests")}
                  </TabsTrigger>
                  <TabsTrigger value="all-requests">
                    {t("allRequests", "requests")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>

          {/* Desktop Table View - Hidden on Mobile */}
          <div className="rounded-md border hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      {t("agent", "requests")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      {t("product", "general")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>{t("quantity", "general")}</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      {t("medianPrice", "requests")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      {t("officialPrice", "requests")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      {t("offeredPrice", "requests")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      {t("deadline", "requests")}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>{t("status", "general")}</TableHead>
                  <TableHead className="text-right">
                    {t("actions", "general")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      {t("noRequests", "requests")}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.agent}
                      </TableCell>
                      <TableCell>{request.product}</TableCell>
                      <TableCell>
                        {request.quantity} {request.unit}
                      </TableCell>
                      <TableCell>
                        ${request.medianPrice.toFixed(2)}/{request.unit}
                      </TableCell>
                      <TableCell>
                        ${request.officialPrice.toFixed(2)}/{request.unit}
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
                        ${request.offeredPrice.toFixed(2)}/{request.unit}
                      </TableCell>
                      <TableCell>{request.deadline}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                        >
                          {t(request.status.toLowerCase(), "requests")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">
                                {t("menu", "general")}
                              </span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              {t("actions", "general")}
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => setSelectedRequest(request)}
                            >
                              {t("viewDetails", "requests")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              {t("contactAgent", "requests")}
                            </DropdownMenuItem>
                            {currentUser.role === "farmer" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  {t("acceptRequest", "requests")}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  {t("declineRequest", "requests")}
                                </DropdownMenuItem>
                              </>
                            )}
                            {currentUser.role === "agent" &&
                              request.agentId === currentUser.agentId && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    {t("editRequest", "requests")}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash className="mr-2 h-4 w-4" />
                                    {t("deleteRequest", "requests")}
                                  </DropdownMenuItem>
                                </>
                              )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View - Hidden on Desktop */}
          <div className="md:hidden space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t("noRequests", "requests")}
              </div>
            ) : (
              filteredRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">
                          {request.product}
                        </CardTitle>
                        <CardDescription>{request.agent}</CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                      >
                        {t(request.status.toLowerCase(), "requests")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">
                          {t("quantity", "general")}:
                        </p>
                        <p className="font-medium">
                          {request.quantity} {request.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">
                          {t("deadline", "requests")}:
                        </p>
                        <p className="font-medium">{request.deadline}</p>
                      </div>
                    </div>

                    <Collapsible
                      open={openCards[request.id]}
                      onOpenChange={() => toggleCard(request.id)}
                      className="mt-2 space-y-2"
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full flex justify-between p-0 h-8"
                        >
                          <span>{t("viewPricingDetails", "requests")}</span>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${
                              openCards[request.id] ? "rotate-90" : ""
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">
                              {t("medianPrice", "requests")}:
                            </p>
                            <p className="font-medium">
                              ${request.medianPrice.toFixed(2)}/{request.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {t("officialPrice", "requests")}:
                            </p>
                            <p className="font-medium">
                              ${request.officialPrice.toFixed(2)}/{request.unit}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-muted-foreground">
                              {t("offeredPrice", "requests")}:
                            </p>
                            <p className="font-medium text-green-600">
                              ${request.offeredPrice.toFixed(2)}/{request.unit}
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedRequest(request)}
                      className="text-xs"
                    >
                      {t("viewDetails", "requests")}
                    </Button>
                    {currentUser.role === "farmer" ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 text-xs"
                        >
                          <XCircle className="mr-1 h-3 w-3" />
                          {t("decline", "general")}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-xs"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {t("accept", "general")}
                        </Button>
                      </div>
                    ) : request.agentId === currentUser.agentId ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          {t("edit", "general")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 text-xs"
                        >
                          {t("delete", "general")}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-xs"
                      >
                        {t("contact", "general")}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {selectedRequest && (
        <Dialog
          open={!!selectedRequest}
          onOpenChange={() => setSelectedRequest(null)}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t("requestDetails", "requests")}</DialogTitle>
              <DialogDescription>
                {t("requestDetailsDesc", "requests")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("agent", "requests")}
                  </h4>
                  <p className="text-base">{selectedRequest.agent}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("product", "general")}
                  </h4>
                  <p className="text-base">{selectedRequest.product}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("quantity", "general")}
                  </h4>
                  <p className="text-base">
                    {selectedRequest.quantity} {selectedRequest.unit}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("deadline", "requests")}
                  </h4>
                  <p className="text-base">{selectedRequest.deadline}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("medianPrice", "requests")}
                  </h4>
                  <p className="text-base">
                    ${selectedRequest.medianPrice.toFixed(2)}/
                    {selectedRequest.unit}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("officialPrice", "requests")}
                  </h4>
                  <p className="text-base">
                    ${selectedRequest.officialPrice.toFixed(2)}/
                    {selectedRequest.unit}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {t("offeredPrice", "requests")}
                  </h4>
                  <p className="text-base text-green-600">
                    ${selectedRequest.offeredPrice.toFixed(2)}/
                    {selectedRequest.unit}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  {t("priceDifference", "requests")}
                </h4>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-800 rounded-md px-2 py-1 text-sm">
                    +$
                    {(
                      selectedRequest.offeredPrice - selectedRequest.medianPrice
                    ).toFixed(2)}
                    /{selectedRequest.unit}(
                    {(
                      ((selectedRequest.offeredPrice -
                        selectedRequest.medianPrice) /
                        selectedRequest.medianPrice) *
                      100
                    ).toFixed(1)}
                    % {t("aboveMarket", "requests")})
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  {t("additionalNotes", "requests")}
                </h4>
                <p className="text-sm">{t("requestNotes", "requests")}</p>
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedRequest(null)}
              >
                {t("close", "general")}
              </Button>
              {currentUser.role === "farmer" ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    {t("decline", "general")}
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {t("accept", "general")}
                  </Button>
                </div>
              ) : selectedRequest.agentId === currentUser.agentId ? (
                <div className="flex gap-2">
                  <Button variant="outline">
                    {t("editRequest", "requests")}
                  </Button>
                  <Button variant="destructive">
                    {t("deleteRequest", "requests")}
                  </Button>
                </div>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">
                  {t("contactAgent", "requests")}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
