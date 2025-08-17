// components/Text.tsx
import React from "react";
import { clsx } from "@/libs/clsx";

type TextSize = "sm" | "md" | "lg" | "xl";
type TextWeight = "light" | "normal" | "medium" | "bold";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  weight?: TextWeight;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  size = "md",
  weight = "normal",
  children,
  className,
  ...props
}) => {
  const sizeClasses: Record<TextSize, string> = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weightClasses: Record<TextWeight, string> = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  return (
    <p
      className={clsx(sizeClasses[size], weightClasses[weight], className)}
      {...props}
    >
      {children}
    </p>
  );
};
