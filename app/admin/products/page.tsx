"use client"

import { useState } from "react"
import { Search, ArrowUpDown, MoreHorizontal, Edit, Trash, Plus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from "@/contexts/language-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock product data
const initialProductsData = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    description: "Fresh red tomatoes",
    unit: "kg",
    officialPrice: 2.45,
    lastUpdated: "2023-05-15",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Potatoes",
    category: "Vegetables",
    description: "Premium quality potatoes",
    unit: "kg",
    officialPrice: 1.15,
    lastUpdated: "2023-05-14",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Carrots",
    category: "Vegetables",
    description: "Organic carrots",
    unit: "kg",
    officialPrice: 1.75,
    lastUpdated: "2023-05-13",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Apples",
    category: "Fruits",
    description: "Red delicious apples",
    unit: "kg",
    officialPrice: 2.2,
    lastUpdated: "2023-05-10",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Oranges",
    category: "Fruits",
    description: "Sweet juicy oranges",
    unit: "kg",
    officialPrice: 2.5,
    lastUpdated: "2023-05-09",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState(initialProductsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Vegetables",
    description: "",
    unit: "kg",
    officialPrice: 0,
    image: "/placeholder.svg?height=100&width=100",
  })

  // Filter products based on search query and category filter
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter === "all" || product.category === categoryFilter),
  )

  const handleAddProduct = () => {
    const id = Math.max(...products.map((p) => p.id)) + 1
    const today = new Date().toISOString().split("T")[0]

    setProducts([
      ...products,
      {
        ...newProduct,
        id,
        lastUpdated: today,
      },
    ])

    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to the product list.`,
    })

    setNewProduct({
      name: "",
      category: "Vegetables",
      description: "",
      unit: "kg",
      officialPrice: 0,
      image: "/placeholder.svg?height=100&width=100",
    })

    setIsAddProductOpen(false)
  }

  const handleEditProduct = () => {
    setProducts(
      products.map((product) => {
        if (product.id === currentProduct.id) {
          return {
            ...currentProduct,
            lastUpdated: new Date().toISOString().split("T")[0],
          }
        }
        return product
      }),
    )

    toast({
      title: "Product updated",
      description: `${currentProduct.name} has been updated.`,
    })

    setIsEditProductOpen(false)
  }

  const handleDeleteProduct = (id) => {
    const productToDelete = products.find((p) => p.id === id)
    setProducts(products.filter((product) => product.id !== id))

    toast({
      title: "Product deleted",
      description: `${productToDelete.name} has been deleted.`,
      variant: "destructive",
    })
  }

  const handleImageUpload = (e, isNew = false) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (isNew) {
          setNewProduct({
            ...newProduct,
            image: event.target.result,
          })
        } else {
          setCurrentProduct({
            ...currentProduct,
            image: event.target.result,
          })
        }

        toast({
          title: "Image uploaded",
          description: "Product image has been uploaded successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new product to the system. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-product-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="new-product-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-product-category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger id="new-product-category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Grains">Grains</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-product-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="new-product-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-product-unit" className="text-right">
                  Unit
                </Label>
                <Select
                  value={newProduct.unit}
                  onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                >
                  <SelectTrigger id="new-product-unit" className="col-span-3">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="lb">Pound (lb)</SelectItem>
                    <SelectItem value="unit">Unit/Piece</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-product-price" className="text-right">
                  Official Price
                </Label>
                <Input
                  id="new-product-price"
                  type="number"
                  step="0.01"
                  value={newProduct.officialPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, officialPrice: Number.parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-product-image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-md border">
                    <img
                      src={newProduct.image || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Label
                    htmlFor="new-product-image-upload"
                    className="flex h-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                    <Input
                      id="new-product-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage products and their official prices.</CardDescription>
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
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead className="w-[200px]">
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
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
                    <TableCell colSpan={8} className="h-24 text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{product.description}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>${product.officialPrice.toFixed(2)}</TableCell>
                      <TableCell>{product.lastUpdated}</TableCell>
                      <TableCell className="text-right">
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
                              onClick={() => {
                                setCurrentProduct(product)
                                setIsEditProductOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Product
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Product
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-product-name"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-category" className="text-right">
                  Category
                </Label>
                <Select
                  value={currentProduct.category}
                  onValueChange={(value) => setCurrentProduct({ ...currentProduct, category: value })}
                >
                  <SelectTrigger id="edit-product-category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                    <SelectItem value="Grains">Grains</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-product-description"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-unit" className="text-right">
                  Unit
                </Label>
                <Select
                  value={currentProduct.unit}
                  onValueChange={(value) => setCurrentProduct({ ...currentProduct, unit: value })}
                >
                  <SelectTrigger id="edit-product-unit" className="col-span-3">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                    <SelectItem value="g">Gram (g)</SelectItem>
                    <SelectItem value="lb">Pound (lb)</SelectItem>
                    <SelectItem value="unit">Unit/Piece</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-price" className="text-right">
                  Official Price
                </Label>
                <Input
                  id="edit-product-price"
                  type="number"
                  step="0.01"
                  value={currentProduct.officialPrice}
                  onChange={(e) =>
                    setCurrentProduct({ ...currentProduct, officialPrice: Number.parseFloat(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-product-image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3 flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-md border">
                    <img
                      src={currentProduct.image || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Label
                    htmlFor="edit-product-image-upload"
                    className="flex h-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                    <Input
                      id="edit-product-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
