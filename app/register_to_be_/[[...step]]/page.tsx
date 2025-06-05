"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRegistrationContext } from "@/contexts/RegistrationContext";
import PhoneAuthForm from "@/components/auth/PhoneAuthForm";
import OtpVerificationForm from "@/components/auth/OtpVerificationForm";
import UserTypeSelectionForm from "@/components/auth/UserTypeSelectionForm";
import UserDetailsForm from "@/components/auth/UserDetailsForm";
import LocationSelectionForm from "@/components/auth/LocationSelectionForm"; // New import
import { useToast } from "@/hooks/use-toast";

// Define the valid steps in the new order
const VALID_STEPS = [
  "user-type",
  "location-select",
  "phone-auth",
  "otp-verify",
  "details",
];

export default function RegisterStepPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { formData } = useRegistrationContext();
  const { toast } = useToast();

  // Determine the current step from URL or default to the first valid step
  let currentUrlStep = params.step
    ? (params.step as string[]).join("/")
    : VALID_STEPS[0];
  if (!VALID_STEPS.includes(currentUrlStep) && currentUrlStep !== "") {
    currentUrlStep = VALID_STEPS[0];
  }
  if (currentUrlStep === "" && VALID_STEPS.length > 0) {
    // Handle initial load with no step in URL
    currentUrlStep = VALID_STEPS[0];
  }

  useEffect(() => {
    const logicalStep = formData.currentLogicalStep;
    const expectedPathForLogicalStep = `/register/${logicalStep}`;

    // 1. If URL step doesn't match logical progression, redirect to logical step
    if (
      logicalStep !== "completed" &&
      VALID_STEPS.includes(logicalStep) &&
      pathname !== expectedPathForLogicalStep
    ) {
      router.replace(expectedPathForLogicalStep);
      return;
    }

    // 2. If URL step and logical step ARE ALIGNED (or logical step is completed),
    //    then check data prerequisites for the current URL step.
    let redirectTo: string | null = null;
    switch (currentUrlStep) {
      case VALID_STEPS[0]: // user-type
        // No data prerequisite from context other than being the start or reset
        break;
      case VALID_STEPS[1]: // location-select
        if (!formData.userType) redirectTo = `/register/${VALID_STEPS[0]}`;
        break;
      case VALID_STEPS[2]: // phone-auth
        if (!formData.userType) redirectTo = `/register/${VALID_STEPS[0]}`;
        else if (!formData.location) redirectTo = `/register/${VALID_STEPS[1]}`;
        break;
      case VALID_STEPS[3]: // otp-verify
        if (!formData.userType) redirectTo = `/register/${VALID_STEPS[0]}`;
        else if (!formData.location) redirectTo = `/register/${VALID_STEPS[1]}`;
        else if (!formData.confirmationResult)
          redirectTo = `/register/${VALID_STEPS[2]}`;
        break;
      case VALID_STEPS[4]: // details
        if (!formData.userType) redirectTo = `/register/${VALID_STEPS[0]}`;
        else if (!formData.location) redirectTo = `/register/${VALID_STEPS[1]}`;
        else if (!formData.confirmationResult)
          redirectTo = `/register/${VALID_STEPS[2]}`;
        else if (!formData.firebaseUser)
          redirectTo = `/register/${VALID_STEPS[3]}`;
        break;
    }

    if (redirectTo && pathname !== redirectTo) {
      toast({
        title: "Access Denied",
        description: "Please complete the previous steps first.",
        variant: "destructive",
      });
      router.replace(redirectTo);
      return;
    }

    // Ensure canonical URL if params.step was invalid and got defaulted
    const derivedUrlStepFromParams = params.step
      ? (params.step as string[]).join("/")
      : VALID_STEPS[0];
    if (
      currentUrlStep !== derivedUrlStepFromParams &&
      pathname !== `/register/${currentUrlStep}` &&
      VALID_STEPS.includes(currentUrlStep)
    ) {
      router.replace(`/register/${currentUrlStep}`);
    }
  }, [params.step, formData, router, toast, pathname]);

  const renderStepContent = () => {
    switch (currentUrlStep) {
      case "user-type":
        return <UserTypeSelectionForm />;
      case "location-select":
        return <LocationSelectionForm />;
      case "phone-auth":
        return <PhoneAuthForm />;
      case "otp-verify":
        return <OtpVerificationForm />;
      case "details":
        return <UserDetailsForm />;
      default:
        // This case should ideally be handled by the useEffect redirecting to VALID_STEPS[0]
        if (pathname !== `/register/${VALID_STEPS[0]}`) {
          router.replace(`/register/${VALID_STEPS[0]}`);
        }
        return null;
    }
  };

  return <div className="w-full">{renderStepContent()}</div>;
}
