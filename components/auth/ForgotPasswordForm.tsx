"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setLoading(true);
    setEmailSent(false);
    if (!auth) {
      toast({
        title: "Authentication Error",
        description:
          "Firebase authentication service is not available. Please try again later.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, values.email);
      toast({
        title: "Password Reset Email Sent",
        description:
          "If an account exists for this email, you will receive a password reset link shortly.",
      });
      setEmailSent(true);
      // Optionally, redirect or clear form after a delay
      // form.reset();
    } catch (error: any) {
      console.error("Forgot password error:", error);
      // Firebase typically doesn't reveal if an email exists for security reasons for sendPasswordResetEmail.
      // So, a generic success message is usually shown.
      // However, if a specific error code like 'auth/invalid-email' occurs, we can show it.
      let errorMessage = "An error occurred. Please try again.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/user-not-found") {
        // Still show generic message for user-not-found to avoid email enumeration
        toast({
          title: "Password Reset Email Sent",
          description:
            "If an account exists for this email, you will receive a password reset link shortly.",
        });
        setEmailSent(true);
        setLoading(false);
        return;
      }

      if (!emailSent) {
        // Only show error toast if we haven't shown the success-like one
        toast({
          title: "Error Sending Reset Email",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <p className="text-foreground">
          A password reset link has been sent to your email address if an
          account is associated with it. Please check your inbox (and spam
          folder).
        </p>
        <Button onClick={() => router.push("/login")} className="w-full">
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
}
