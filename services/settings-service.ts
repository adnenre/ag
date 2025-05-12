import { databases, DATABASE_ID, SETTINGS_COLLECTION_ID, isAppwriteAvailable } from "@/lib/appwrite"

// Default settings
const defaultSettings = {
  id: "app_settings",
  appName: "AgriConnect",
  appNameColor: "#22c55e",
  primaryColor: "#22c55e",
  adminEmail: "admin@agriconnect.com",
  supportEmail: "support@agriconnect.com",
  passwordPolicy: "Strong (min. 8 chars, uppercase, lowercase, number, special char)",
  sessionTimeout: 30,
  twoFactorAuth: "optional",
}

export interface AppSettings {
  id: string
  appName: string
  appNameColor: string
  primaryColor: string
  adminEmail: string
  supportEmail: string
  passwordPolicy: string
  sessionTimeout: number
  twoFactorAuth: string
}

export const SettingsService = {
  // Get application settings
  getSettings: async (): Promise<AppSettings> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        try {
          const settings = await databases.getDocument(DATABASE_ID, SETTINGS_COLLECTION_ID, "app_settings")
          return settings as unknown as AppSettings
        } catch (error) {
          // If settings don't exist, create them with defaults
          const settings = await databases.createDocument(
            DATABASE_ID,
            SETTINGS_COLLECTION_ID,
            "app_settings",
            defaultSettings,
          )
          return settings as unknown as AppSettings
        }
      } else {
        // Fallback to default settings
        return defaultSettings
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      // Fallback to default settings on error
      return defaultSettings
    }
  },

  // Update application settings
  updateSettings: async (settingsData: Partial<AppSettings>): Promise<AppSettings> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        try {
          // Try to update existing settings
          const settings = await databases.updateDocument(
            DATABASE_ID,
            SETTINGS_COLLECTION_ID,
            "app_settings",
            settingsData,
          )
          return settings as unknown as AppSettings
        } catch (error) {
          // If settings don't exist, create them
          const settings = await databases.createDocument(DATABASE_ID, SETTINGS_COLLECTION_ID, "app_settings", {
            ...defaultSettings,
            ...settingsData,
          })
          return settings as unknown as AppSettings
        }
      } else {
        // Fallback to updating local settings
        Object.assign(defaultSettings, settingsData)
        return defaultSettings
      }
    } catch (error) {
      console.error("Error updating settings:", error)
      // Fallback to updating local settings on error
      Object.assign(defaultSettings, settingsData)
      return defaultSettings
    }
  },
}
