import { cn } from "@/lib/utils"; // Assuming you're using shadcn

interface DateTimeProps {
  date?: string | Date | null;
  className?: string;
  fallbackText?: string;
}

export function DateTime({
  date,
  className,
  fallbackText = "",
}: DateTimeProps) {
  // Handle null/undefined and invalid dates
  if (!date || isNaN(new Date(date).getTime())) {
    return (
      <span className={cn("text-muted-foreground", className)}>
        {fallbackText}
      </span>
    );
  }

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <time
      dateTime={new Date(date).toISOString()}
      className={cn(className)}
      title={new Date(date).toLocaleString()}
    >
      {formattedDate}
    </time>
  );
}
