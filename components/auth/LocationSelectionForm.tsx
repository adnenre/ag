"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegistrationContext } from "@/contexts/RegistrationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Not used but often useful
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationDropdown from "./LocationDropdown";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { LocationFarmer } from "@/components/auth/locationFarmer";

const locationSchema = z.object({
  location: z.string().min(1, "Location is required"),
});

export default function LocationSelectionForm() {
  const router = useRouter();
  const { formData, setFormData } = useRegistrationContext();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This component specific check is a fallback.
    // The main routing guard is in src/app/register/[[...step]]/page.tsx
    if (formData.currentLogicalStep === "user-type" && !formData.userType) {
      // If user somehow lands here but hasn't selected type, and context agrees it's type selection phase
      toast({
        title: "Invalid Step",
        description: "Please select your user type first.",
        variant: "destructive",
      });
      router.replace("/register/user-type");
    } else if (
      formData.currentLogicalStep !== "location-select" &&
      formData.currentLogicalStep !== "user-type" &&
      formData.currentLogicalStep !== "completed"
    ) {
      // If logical step is something else, page.tsx should handle redirect.
    }
  }, [formData, router, toast]);

  const form = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: { location: formData.location || "" },
  });

  async function onSubmit(values: z.infer<typeof locationSchema>) {
    setLoading(true);
    setFormData((prev) => ({
      ...prev,
      location: values.location,
      currentLogicalStep: "phone-auth",
    }));
    toast({
      title: "Location Saved",
      description: `Your location: ${values.location}.`,
    });
    router.push("/register/phone-auth");
    // setLoading(false); // Done in finally if there was an async operation
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Location</CardTitle>
        <CardDescription>Please choose your region.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Region)</FormLabel>
                  {/* <LocationDropdown
                    value={field.value}
                    onValueChange={field.onChange}
                  /> */}
                  <LocationFarmer onValueChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
