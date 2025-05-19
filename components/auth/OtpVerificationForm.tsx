"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegistrationContext } from "@/contexts/RegistrationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

export default function OtpVerificationForm() {
  const router = useRouter();
  const { formData, setFormData } = useRegistrationContext();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Basic check, main guard in page.tsx
    if (
      formData.currentLogicalStep === "phone-auth" &&
      !formData.confirmationResult
    ) {
      toast({
        title: "Invalid Step",
        description: "Please enter your phone number first.",
        variant: "destructive",
      });
      router.replace("/register/phone-auth");
    }
  }, [formData, router, toast]);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    setLoading(true);
    if (!formData.confirmationResult) {
      toast({
        title: "Error",
        description: "No OTP request found. Please start over.",
        variant: "destructive",
      });
      router.replace("/register/phone-auth"); // Or even earlier depending on what's missing
      setLoading(false);
      return;
    }

    try {
      const userCredential = await formData.confirmationResult.confirm(
        values.otp
      );
      const firebaseUser = userCredential.user;
      setFormData((prev) => ({
        ...prev,
        firebaseUser,
        currentLogicalStep: "details",
      }));
      toast({
        title: "Phone Verified!",
        description: "Your phone number has been successfully verified.",
      });
      router.push("/register/details");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "OTP Verification Failed",
        description:
          error.message ||
          "Invalid OTP or an error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify OTP</CardTitle>
        <CardDescription>
          Enter the 6-digit OTP sent to {formData.phoneNumber}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password (OTP)</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
