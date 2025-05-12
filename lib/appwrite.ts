import { Client, Account, Databases, Storage, ID, Query } from "appwrite"

// Initialize the Appwrite client
const client = new Client()

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined"

if (isBrowser) {
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
}

// Export the Appwrite services
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""
export const USERS_COLLECTION_ID = "users"
export const PRODUCTS_COLLECTION_ID = "products"
export const REQUESTS_COLLECTION_ID = "requests"
export const INVENTORY_COLLECTION_ID = "inventory"
export const SETTINGS_COLLECTION_ID = "settings"
export const MODULES_COLLECTION_ID = "modules"

// Helper function to check if Appwrite is available
export const isAppwriteAvailable = async (): Promise<boolean> => {
  if (!DATABASE_ID) return false

  try {
    // Try to fetch a single document to check if Appwrite is available
    await databases.listDocuments(DATABASE_ID, SETTINGS_COLLECTION_ID, [Query.limit(1)])
    return true
  } catch (error) {
    console.error("Appwrite connection error:", error)
    return false
  }
}

// Generate a unique ID
export const generateId = (): string => {
  return ID.unique()
}
