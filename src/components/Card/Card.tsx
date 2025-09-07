import React from "react";
import {
  cardVariants,
  cardHeader,
  cardBody,
  cardFooter,
} from "../../styles/recipes/card.css";
import { cn } from "../../utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  elevation?: "flat" | "low" | "medium" | "high";
  variant?: "default" | "outlined" | "filled" | "gradient";
  interactive?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Main Card component
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, size, elevation, variant, interactive, className, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ size, elevation, variant, interactive }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

// Card Header component
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardHeader, className)} {...props}>
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

// Card Body component
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardBody, className)} {...props}>
        {children}
      </div>
    );
  },
);

CardBody.displayName = "CardBody";

// Card Footer component
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(cardFooter, className)} {...props}>
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
