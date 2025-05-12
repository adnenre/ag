"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Mock product data with official prices
const initialProductsData = [
  {
    id: 1,
    product: "Tomatoes",
    category: "Vegetables",
    unit: "kg",
    officialPrice: 2.45,
    lastUpdated: "2023-05-15",
    isEditing: false,
  },
  {
    id: 2,
    product: "Potatoes",
    category: "Vegetables",
    unit: "kg",
    officialPrice: 1.15,
    lastUpdated: "2023-05-14",
    isEditing: false,
  },
  {
    id: 3,
    product: "Carrots",
    category: "Vegetables",
    unit: "kg",
    officialPrice: 1.75,
    lastUpdated: "2023-05-13",
    isEditing: false,
  },
  {
    id: 4,
    product: "Lettuce",
    category: "Vegetables",
    unit: "kg",
    officialPrice: 3.1,
    lastUpdated: "2023-05-12",
    isEditing: false,
  },
  {
    id: 5,
    product: "Onions",
    category: "Vegetables",
    unit: "kg",
    officialPrice: 1.35,
    lastUpdated: "2023-05-11",
    isEditing: false,
  },
  {
    id: 6,
    product: "Apples",
    category: "Fruits",
    unit: "kg",
    officialPrice: 2.2,
    lastUpdated: "2023-05-10",
    isEditing: false,
  },
  {
    id: 7,
    product: "Oranges",
    category: "Fruits",
    unit: "kg",
    officialPrice: 2.5,
    lastUpdated: "2023-05-09",
    isEditing: false,
  },
  {
    id: 8,
    product: "Bananas",
    category: "Fruits",
    unit: "kg",
    officialPrice: 1.8,
    lastUpdated: "2023-05-08",
    isEditing: false,
  },
];

export default function OfficialPricesPage() {
  const [products, setProducts] = useState(initialProductsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editValues, setEditValues] = useState({});

  const filteredProducts = products.filter(
    (product) =>
      product.product.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "all" || product.category === categoryFilter)
  );

  const handleEdit = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          setEditValues({ ...editValues, [id]: product.officialPrice });
          return { ...product, isEditing: true };
        }
        return product;
      })
    );
  };

  const handleSave = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newPrice = Number.parseFloat(editValues[id]);
          if (isNaN(newPrice) || newPrice <= 0) {
            toast({
              title: "Invalid price",
              description: "Please enter a valid price greater than zero.",
              variant: "destructive",
            });
            return product;
          }

          toast({
            title: "Price updated",
            description: `Official price for ${
              product.product
            } updated to $${newPrice.toFixed(2)}/${product.unit}`,
          });

          return {
            ...product,
            officialPrice: newPrice,
            lastUpdated: new Date().toISOString().split("T")[0],
            isEditing: false,
          };
        }
        return product;
      })
    );
  };

  const handleCancel = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, isEditing: false };
        }
        return product;
      })
    );
  };

  const handlePriceChange = (id, value) => {
    setEditValues({ ...editValues, [id]: value });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Official Prices Management
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Official Prices</CardTitle>
          <CardDescription>
            Manage official prices for all products. These prices will be
            visible to all users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center w-full md:w-auto space-x-2">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full md:w-[250px]"
              />
              <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <div className="flex items-center w-full md:w-auto space-x-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Product
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Official Price
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Last Updated
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.product}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>
                        {product.isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={editValues[product.id]}
                            onChange={(e) =>
                              handlePriceChange(product.id, e.target.value)
                            }
                            className="w-24 h-8"
                          />
                        ) : (
                          <>
                            {product.officialPrice.toFixed(2)} TND/
                            {product.unit}
                          </>
                        )}
                      </TableCell>
                      <TableCell>{product.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        {product.isEditing ? (
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSave(product.id)}
                              className="h-8 w-8 text-green-600"
                            >
                              <Save className="h-4 w-4" />
                              <span className="sr-only">Save</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCancel(product.id)}
                              className="h-8 w-8 text-red-600"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          </div>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleEdit(product.id)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Price
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                View Price History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
