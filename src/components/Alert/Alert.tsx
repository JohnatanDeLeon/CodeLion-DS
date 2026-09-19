import React from "react";
import {
  alertBody,
  alertRecipe,
  alertTitle,
} from "../../styles/recipes/alert.css";
import { cn } from "../../utils";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tone of the message. Also decides how it is announced. */
  variant?: AlertVariant;
  /** Optional short heading above the message. */
  title?: string;
  children: React.ReactNode;
}

/**
 * Errors and warnings interrupt the reader (`role="alert"`); information and
 * confirmations wait for a pause (`role="status"`). An explicit `role` prop
 * still wins.
 */
const roleFor = (variant: AlertVariant) =>
  variant === "error" || variant === "warning" ? "alert" : "status";

/**
 * A message about the page or the last action, not about a single field:
 * the form failed for a reason no input caused, or an action succeeded.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", title, children, className, ...props }, ref) => (
    <div
      ref={ref}
      role={roleFor(variant)}
      className={cn(alertRecipe({ variant }), className)}
      {...props}
    >
      {title && <p className={alertTitle}>{title}</p>}
      <div className={alertBody}>{children}</div>
    </div>
  ),
);

Alert.displayName = "Alert";
