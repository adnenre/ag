import {
  databases,
  DATABASE_ID,
  PRODUCTS_COLLECTION_ID,
  storage,
  isAppwriteAvailable,
  generateId,
} from "@/lib/appwrite"
import { ID } from "appwrite"

// Dummy product data
const dummyProducts = [
  {
    id: "1",
    name: "Tomatoes",
    category: "Vegetables",
    description: "Fresh red tomatoes",
    unit: "kg",
    officialPrice: 2.45,
    lastUpdated: "2023-05-15",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Potatoes",
    category: "Vegetables",
    description: "Premium quality potatoes",
    unit: "kg",
    officialPrice: 1.15,
    lastUpdated: "2023-05-14",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Carrots",
    category: "Vegetables",
    description: "Organic carrots",
    unit: "kg",
    officialPrice: 1.75,
    lastUpdated: "2023-05-13",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Apples",
    category: "Fruits",
    description: "Red delicious apples",
    unit: "kg",
    officialPrice: 2.2,
    lastUpdated: "2023-05-10",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Oranges",
    category: "Fruits",
    description: "Sweet juicy oranges",
    unit: "kg",
    officialPrice: 2.5,
    lastUpdated: "2023-05-09",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export interface Product {
  id: string
  name: string
  category: string
  description: string
  unit: string
  officialPrice: number
  lastUpdated: string
  image: string
}

export const ProductService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        const response = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID)
        return response.documents as unknown as Product[]
      } else {
        // Fallback to dummy data
        return dummyProducts
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      // Fallback to dummy data on error
      return dummyProducts
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        const product = await databases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id)
        return product as unknown as Product
      } else {
        // Fallback to dummy data
        const product = dummyProducts.find((p) => p.id === id)
        return product || null
      }
    } catch (error) {
      console.error("Error fetching product:", error)
      // Fallback to dummy data on error
      const product = dummyProducts.find((p) => p.id === id)
      return product || null
    }
  },

  // Create a new product
  createProduct: async (productData: Omit<Product, "id">): Promise<Product> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        const product = await databases.createDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, ID.unique(), productData)
        return product as unknown as Product
      } else {
        // Fallback to dummy data
        const newProduct = {
          id: generateId(),
          ...productData,
        }
        dummyProducts.push(newProduct)
        return newProduct
      }
    } catch (error) {
      console.error("Error creating product:", error)
      // Fallback to dummy data on error
      const newProduct = {
        id: generateId(),
        ...productData,
      }
      dummyProducts.push(newProduct)
      return newProduct
    }
  },

  // Update a product
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        const product = await databases.updateDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id, productData)
        return product as unknown as Product
      } else {
        // Fallback to dummy data
        const index = dummyProducts.findIndex((p) => p.id === id)
        if (index !== -1) {
          dummyProducts[index] = { ...dummyProducts[index], ...productData }
          return dummyProducts[index]
        }
        throw new Error("Product not found")
      }
    } catch (error) {
      console.error("Error updating product:", error)
      // Fallback to dummy data on error
      const index = dummyProducts.findIndex((p) => p.id === id)
      if (index !== -1) {
        dummyProducts[index] = { ...dummyProducts[index], ...productData }
        return dummyProducts[index]
      }
      throw new Error("Product not found")
    }
  },

  // Delete a product
  deleteProduct: async (id: string): Promise<void> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        await databases.deleteDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id)
      } else {
        // Fallback to dummy data
        const index = dummyProducts.findIndex((p) => p.id === id)
        if (index !== -1) {
          dummyProducts.splice(index, 1)
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error)
      // Fallback to dummy data on error
      const index = dummyProducts.findIndex((p) => p.id === id)
      if (index !== -1) {
        dummyProducts.splice(index, 1)
      }
    }
  },

  // Upload product image
  uploadProductImage: async (file: File): Promise<string> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        const result = await storage.createFile("product_images", ID.unique(), file)

        // Get the file URL
        const fileUrl = storage.getFileView("product_images", result.$id)
        return fileUrl.href
      } else {
        // Fallback for local development
        return URL.createObjectURL(file)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      // Fallback for errors
      return URL.createObjectURL(file)
    }
  },
}
