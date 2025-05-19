"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
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

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number too long")
    .regex(/^\d+$/, "Invalid phone number format"),
});

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: any;
  }
}

export default function PhoneAuthForm() {
  const router = useRouter();
  const { formData, setFormData } = useRegistrationContext();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: formData.phoneNumber.replace(/^\+216/, "") || "",
    },
  });

  useEffect(() => {
    // Step validation (basic check, main guard in page.tsx)
    if (
      formData.currentLogicalStep === "location-select" &&
      (!formData.userType || !formData.location)
    ) {
      // If context suggests previous step but data is missing
      toast({
        title: "Invalid Step",
        description: "Please complete user type and location selection first.",
        variant: "destructive",
      });
      if (!formData.userType) {
        router.replace("/register/user-type");
      } else {
        router.replace("/register/location-select");
      }
      return; // Prevent reCAPTCHA setup if redirecting
    }

    if (auth && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response: any) => {
              // reCAPTCHA solved
            },
            "expired-callback": () => {
              toast({
                title: "reCAPTCHA expired",
                description: "Please try sending OTP again.",
                variant: "destructive",
              });
              if (window.recaptchaVerifier) {
                window.recaptchaVerifier.render().then((widgetId) => {
                  // @ts-ignore
                  if (window.grecaptcha && widgetId !== undefined) {
                    // @ts-ignore
                    window.grecaptcha.reset(widgetId);
                  }
                });
              }
            },
          }
        );
        window.recaptchaVerifier.render().catch((err) => {
          console.error("RecaptchaVerifier render error:", err);
          toast({
            title: "reCAPTCHA Error",
            description: "Failed to render reCAPTCHA. Please refresh.",
            variant: "destructive",
          });
        });
      } catch (error) {
        console.error("Error initializing RecaptchaVerifier:", error);
        toast({
          title: "Setup Error",
          description: "Could not initialize phone sign-in. Please refresh.",
          variant: "destructive",
        });
      }
    }
  }, [auth, toast, formData, router]);

  async function onSubmit(values: z.infer<typeof phoneSchema>) {
    setLoading(true);
    if (!auth || !window.recaptchaVerifier) {
      toast({
        title: "Error",
        description: "Authentication service not ready. Please refresh.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const fullPhoneNumber = `+216${values.phoneNumber}`;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        window.recaptchaVerifier
      );
      setFormData((prev) => ({
        ...prev,
        phoneNumber: fullPhoneNumber,
        confirmationResult,
        currentLogicalStep: "otp-verify",
      }));
      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${fullPhoneNumber}.`,
      });
      router.push("/register/otp-verify");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast({
        title: "OTP Send Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.render().then((widgetId) => {
          // @ts-ignore
          if (window.grecaptcha && widgetId !== undefined) {
            // @ts-ignore
            window.grecaptcha.reset(widgetId);
          }
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Phone Number</CardTitle>
        <CardDescription>
          We'll send you an OTP to verify your phone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Tunisia)</FormLabel>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-secondary text-muted-foreground text-sm">
                      +216
                    </span>
                    <FormControl>
                      <Input
                        placeholder="20123456"
                        {...field}
                        className="rounded-l-none"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div id="recaptcha-container"></div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
