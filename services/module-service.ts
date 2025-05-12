import { databases, DATABASE_ID, MODULES_COLLECTION_ID, isAppwriteAvailable } from "@/lib/appwrite"

// Default modules configuration
const defaultModules = {
  id: "app_modules",
  modules: {
    farmer: {
      id: "farmer",
      name: "Module agriculteur",
      description: "Enable features for farmers to manage inventory and respond to market requests",
      enabled: true,
      icon: "User",
    },
    marketBuyer: {
      id: "marketBuyer",
      name: "Module acheteur du marché gros",
      description: "Enable features for market buyers to create requests and connect with farmers",
      enabled: true,
      icon: "Users",
    },
    contentEditor: {
      id: "contentEditor",
      name: "Module content editor",
      description: "Enable content management features for news, articles, and educational resources",
      enabled: false,
      icon: "Edit",
    },
    pricingModel: {
      id: "pricingModel",
      name: "Module pricing model",
      description: "Enable advanced pricing models, analytics, and price prediction features",
      enabled: false,
      icon: "Calculator",
    },
  },
}

export interface Module {
  id: string
  name: string
  description: string
  enabled: boolean
  icon: string
}

export interface ModulesConfig {
  id: string
  modules: {
    [key: string]: Module
  }
}

export const ModuleService = {
  // Get modules configuration
  getModules: async (): Promise<ModulesConfig> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        try {
          const modulesConfig = await databases.getDocument(DATABASE_ID, MODULES_COLLECTION_ID, "app_modules")
          return modulesConfig as unknown as ModulesConfig
        } catch (error) {
          // If modules config doesn't exist, create it with defaults
          const modulesConfig = await databases.createDocument(
            DATABASE_ID,
            MODULES_COLLECTION_ID,
            "app_modules",
            defaultModules,
          )
          return modulesConfig as unknown as ModulesConfig
        }
      } else {
        // Fallback to default modules
        return defaultModules
      }
    } catch (error) {
      console.error("Error fetching modules:", error)
      // Fallback to default modules on error
      return defaultModules
    }
  },

  // Update modules configuration
  updateModules: async (modulesData: Partial<ModulesConfig>): Promise<ModulesConfig> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()

      if (appwriteAvailable) {
        try {
          // Try to update existing modules config
          const modulesConfig = await databases.updateDocument(
            DATABASE_ID,
            MODULES_COLLECTION_ID,
            "app_modules",
            modulesData,
          )
          return modulesConfig as unknown as ModulesConfig
        } catch (error) {
          // If modules config doesn't exist, create it
          const modulesConfig = await databases.createDocument(DATABASE_ID, MODULES_COLLECTION_ID, "app_modules", {
            ...defaultModules,
            ...modulesData,
          })
          return modulesConfig as unknown as ModulesConfig
        }
      } else {
        // Fallback to updating local modules
        if (modulesData.modules) {
          Object.assign(defaultModules.modules, modulesData.modules)
        }
        return defaultModules
      }
    } catch (error) {
      console.error("Error updating modules:", error)
      // Fallback to updating local modules on error
      if (modulesData.modules) {
        Object.assign(defaultModules.modules, modulesData.modules)
      }
      return defaultModules
    }
  },

  // Toggle module status
  toggleModule: async (moduleId: string, enabled: boolean): Promise<ModulesConfig> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable()
      const currentConfig = await ModuleService.getModules()

      if (!currentConfig.modules[moduleId]) {
        throw new Error(`Module ${moduleId} not found`)
      }

      // Update the module status
      const updatedModules = {
        ...currentConfig.modules,
        [moduleId]: {
          ...currentConfig.modules[moduleId],
          enabled,
        },
      }

      if (appwriteAvailable) {
        try {
          // Try to update existing modules config
          const modulesConfig = await databases.updateDocument(DATABASE_ID, MODULES_COLLECTION_ID, "app_modules", {
            modules: updatedModules,
          })
          return modulesConfig as unknown as ModulesConfig
        } catch (error) {
          // If modules config doesn't exist, create it
          const modulesConfig = await databases.createDocument(DATABASE_ID, MODULES_COLLECTION_ID, "app_modules", {
            id: "app_modules",
            modules: updatedModules,
          })
          return modulesConfig as unknown as ModulesConfig
        }
      } else {
        // Fallback to updating local modules
        defaultModules.modules = updatedModules
        return defaultModules
      }
    } catch (error) {
      console.error("Error toggling module:", error)
      // Fallback to updating local modules on error
      if (defaultModules.modules[moduleId]) {
        defaultModules.modules[moduleId].enabled = enabled
      }
      return defaultModules
    }
  },
}
