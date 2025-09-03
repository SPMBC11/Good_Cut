import * as React from "react";
import { cn } from "../../lib/utils";

// Card
export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bg-white border rounded-xl p-4 shadow-sm", className)}>
      {children}
    </div>
  );
};

// CardHeader
export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("mb-2", className)}>{children}</div>
);

// CardTitle
export const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>
);

// CardContent
export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("", className)}>{children}</div>;
