"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"
import { User, Users, Edit, Calculator, Loader2 } from "lucide-react"
import { ModuleService, type Module } from "@/services/module-service"

export default function ModulesPage() {
  const { t } = useLanguage()
  const [modules, setModules] = useState<Record<string, Module>>({})
  const [loading, setLoading] = useState(true)

  // Load modules on initial render
  useEffect(() => {
    const loadModules = async () => {
      try {
        setLoading(true)
        const modulesConfig = await ModuleService.getModules()
        setModules(modulesConfig.modules)
      } catch (error) {
        console.error("Error loading modules:", error)
        toast({
          title: "Error",
          description: "Failed to load modules. Using default configuration.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadModules()
  }, [])

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "User":
        return User
      case "Users":
        return Users
      case "Edit":
        return Edit
      case "Calculator":
        return Calculator
      default:
        return User
    }
  }

  const toggleModule = async (moduleId: string) => {
    try {
      const newEnabled = !modules[moduleId].enabled

      // Optimistically update UI
      setModules({
        ...modules,
        [moduleId]: {
          ...modules[moduleId],
          enabled: newEnabled,
        },
      })

      // Update in backend
      await ModuleService.toggleModule(moduleId, newEnabled)

      toast({
        title: `Module ${newEnabled ? "enabled" : "disabled"}`,
        description: `${modules[moduleId].name} has been ${newEnabled ? "enabled" : "disabled"}.`,
      })
    } catch (error) {
      console.error("Error toggling module:", error)

      // Revert UI on error
      setModules({
        ...modules,
        [moduleId]: {
          ...modules[moduleId],
          enabled: !modules[moduleId].enabled,
        },
      })

      toast({
        title: "Error",
        description: "Failed to update module status.",
        variant: "destructive",
      })
    }
  }

  const saveModuleSettings = async () => {
    try {
      await ModuleService.updateModules({ modules })

      toast({
        title: "Module settings saved",
        description: "Module configuration has been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving module settings:", error)

      toast({
        title: "Error",
        description: "Failed to save module settings.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading modules...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Module Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Modules</CardTitle>
          <CardDescription>Enable or disable application modules to control available features.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.values(modules).map((module) => {
            const IconComponent = getIconComponent(module.icon)

            return (
              <div key={module.id} className="flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{module.name}</h3>
                      <Badge variant={module.enabled ? "default" : "outline"} className="ml-2">
                        {module.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </div>
                </div>
                <Switch checked={module.enabled} onCheckedChange={() => toggleModule(module.id)} />
              </div>
            )
          })}
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={saveModuleSettings}>Save Module Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Module Dependencies</CardTitle>
          <CardDescription>Some modules depend on others to function properly.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h3 className="font-medium">Dependency Information</h3>
              <ul className="mt-2 list-disc pl-5 text-sm">
                <li>
                  The <strong>Pricing Model</strong> module requires the <strong>Farmer</strong> and{" "}
                  <strong>Market Buyer</strong> modules to be enabled.
                </li>
                <li>
                  The <strong>Content Editor</strong> module can function independently.
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
