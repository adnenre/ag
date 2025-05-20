"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useRegistrationContext,
  UserType,
} from "@/contexts/RegistrationContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Leaf, Briefcase } from "lucide-react";

const userTypeSchema = z.object({
  userType: z.enum(["farmer", "agent"], {
    required_error: "You need to select a user type.",
  }),
});

export default function UserTypeSelectionForm() {
  const router = useRouter();
  const { formData, setFormData } = useRegistrationContext();
  const { toast } = useToast();

  useEffect(() => {
    // Basic check, main guards are in page.tsx
    if (
      formData.currentLogicalStep !== "user-type" &&
      formData.currentLogicalStep !== "completed"
    ) {
      // If logical step is beyond user-type, page.tsx should redirect.
      // If it's 'completed', user might be trying to restart.
      // No specific redirect here, rely on page.tsx for strict step enforcement.
    }
  }, [formData, router, toast]);

  const form = useForm<z.infer<typeof userTypeSchema>>({
    resolver: zodResolver(userTypeSchema),
    defaultValues: { userType: formData.userType || undefined },
  });

  function onSubmit(values: z.infer<typeof userTypeSchema>) {
    setFormData((prev) => ({
      ...prev,
      userType: values.userType as UserType,
      currentLogicalStep: "location-select",
    }));
    toast({
      title: "User Type Selected",
      description: `You've selected: ${values.userType}.`,
    });
    router.push("/register/location-select");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Role</CardTitle>
        <CardDescription>Are you a farmer or an agent?</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex   "
                    >
                      <FormItem className="flex-1">
                        <FormControl>
                          <RadioGroupItem
                            value="farmer"
                            id="farmer"
                            className="sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="farmer"
                          className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                            field.value === "farmer"
                              ? "border-primary ring-2 ring-primary"
                              : ""
                          }`}
                        >
                          <Leaf className="mb-3 h-8 w-8 text-primary" />
                          Farmer
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex-1">
                        <FormControl>
                          <RadioGroupItem
                            value="agent"
                            id="agent"
                            className="sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="agent"
                          className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer 
                            ${
                              field.value === "agent"
                                ? "border-primary ring-2 ring-primary"
                                : ""
                            }`}
                        >
                          <Briefcase className="mb-3 h-8 w-8 text-primary" />
                          Agent
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
