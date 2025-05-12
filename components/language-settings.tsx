"use client"

import { useLanguage } from "@/contexts/language-context"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import type { Language } from "@/lib/translations"

export function LanguageSettings() {
  const { t, language, changeLanguage } = useLanguage()

  const handleSaveLanguage = () => {
    toast({
      title: t("success", "general"),
      description: t("languageUpdated", "settings"),
    })
  }

  const languages = [
    { id: "en", name: "English", label: "English" },
    { id: "fr", name: "French", label: "Français" },
    { id: "ar", name: "Arabic", label: "العربية" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("language", "settings")}</CardTitle>
        <CardDescription>{t("languageRegionDesc", "settings")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>{t("language", "settings")}</Label>
            <RadioGroup
              value={language}
              onValueChange={(value) => changeLanguage(value as Language)}
              className="mt-2 space-y-2"
            >
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang.id} id={`lang-${lang.id}`} />
                  <Label htmlFor={`lang-${lang.id}`} className="cursor-pointer font-normal">
                    {lang.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveLanguage} className="bg-green-600 hover:bg-green-700">
          {t("saveLanguage", "settings")}
        </Button>
      </CardFooter>
    </Card>
  )
}
