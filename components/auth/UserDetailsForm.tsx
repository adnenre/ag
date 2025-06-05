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
import { Separator } from "@/components/ui/separator";
// LocationDropdown is no longer used here for selection
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const baseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(), // Will be pre-filled and disabled
  location: z.string().min(1, "Location is required"), // Will be pre-filled and disabled
  password: z.string().min(5, "Name must be at least 5 characters"),
  passwordConfirmation: z.string().min(5, "Name must be at least 5 characters"),
});

const farmerSchema = baseSchema.extend({
  // farmSize: z.string().min(1, "Farm size is required (e.g., 5 Ha)"),
  crops: z.string().min(3, "Crops are required (e.g., Maize, Beans)"),
});

const agentSchema = baseSchema.extend({
  agencyName: z.string().min(2, "Agency name is required"),
  specialization: z.string().min(3, "Specialization is required"),
});

type FormValues = z.infer<typeof baseSchema> &
  Partial<z.infer<typeof farmerSchema>> &
  Partial<z.infer<typeof agentSchema>>;

export default function UserDetailsForm() {
  const router = useRouter();
  const { formData, setFormData, resetForm } = useRegistrationContext();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Determine current schema based on user type from context
  const currentSchema =
    formData.userType === "farmer" ? farmerSchema : agentSchema;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: formData.name || "",
      email: formData.email || "",
      password: formData.password || "",
      passwordConfirmation: formData.passwordConfirmation || "",
      phoneNumber:
        formData.firebaseUser?.phoneNumber || formData.phoneNumber || "",
      location: formData.location || "", // Pre-fill from context
      // farmSize:
      //   formData.userType === "farmer" ? formData.farmSize || "" : undefined,
      crops:
        formData.userType === "farmer"
          ? formData.crops?.join(", ") || ""
          : undefined,
      agencyName:
        formData.userType === "agent" ? formData.agencyName || "" : undefined,
      specialization:
        formData.userType === "agent"
          ? formData.specialization || ""
          : undefined,
    },
  });

  useEffect(() => {
    // Basic check, main guard in page.tsx
    if (
      formData.currentLogicalStep === "otp-verify" &&
      (!formData.firebaseUser || !formData.userType || !formData.location)
    ) {
      toast({
        title: "Invalid Step",
        description: "Please complete all previous steps.",
        variant: "destructive",
      });
      // Attempt to redirect to the earliest incomplete step, page.tsx should handle more robustly
      if (!formData.userType) router.replace("/register/user-type");
      else if (!formData.location) router.replace("/register/location-select");
      else if (!formData.firebaseUser) router.replace("/register/otp-verify");
      else router.replace("/register/user-type");
    }

    // Pre-fill phone number and location from context as they are not editable here
    const phone = formData.firebaseUser?.phoneNumber || formData.phoneNumber;
    if (phone) {
      form.setValue("phoneNumber", phone);
    }
    if (formData.location) {
      form.setValue("location", formData.location);
    }
  }, [formData, router, toast, form]);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    console.log("Form Data Submitted:", values);

    setFormData((prev) => ({
      ...prev,
      ...values, // values already includes location and phoneNumber from form state
      crops: values.crops
        ? values.crops.split(",").map((c) => c.trim())
        : undefined,
      currentLogicalStep: "completed",
    }));
    try {
      const { email, password, name, phoneNumber, userType: role } = formData;
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, {
        displayName: name,
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phoneNumber,
        role,
        createdAt: new Date().toISOString(),
      }).then(() => {
        router.replace("/profile");
      });
      toast({
        title: "Registration Complete!",
        description: "Your details have been saved successfully.",
      });

      resetForm();

      setLoading(false);
    } catch (error: any) {
      console.error("Registration error:", error);

      // Handle specific Firebase error codes
      let errorMessage = "There was an error creating your account.";

      if (error.code === "auth/operation-not-allowed") {
        errorMessage =
          "Email/password sign-in is not enabled. Please contact the administrator.";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already in use. Please try another email or sign in.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "The password is too weak. Please use a stronger password.";
      }

      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }
  if (!formData.userType) {
    // This should ideally be caught by the page.tsx guard and redirected.
    // If it still occurs, it implies a logic error or direct navigation attempt.
    return <p>Loading user type or invalid step... Redirecting...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {formData.userType === "farmer" ? "Farmer" : "Agent"} Details
        </CardTitle>
        <CardDescription>
          Please fill in your information. Your phone and location are
          pre-filled.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input placeholder="Password Confirmation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Verified)</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Region - Selected)</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formData.userType === "farmer" && (
              <>
                {/* 
              <Separator className="my-6" />
                 <FormField
                  control={form.control}
                  name="farmSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Size (e.g., 5 Ha)</FormLabel>
                      <FormControl>
                        <Input placeholder="5 Ha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="crops"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Crops (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="Maize, Beans, Millet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {formData.userType === "agent" && (
              <>
                <FormField
                  control={form.control}
                  name="agencyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agency Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="AgTunisie Services" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area of Specialization</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Crop nutrition, Pest control"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Registration
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
