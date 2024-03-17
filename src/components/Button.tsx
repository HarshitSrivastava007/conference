import React from "react";
import { cn } from "../lib/utils";

function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(buttonClassName, className)} {...props} />;
}

export default Button;

export const buttonClassName =
  "flex items-center justify-center gap-2 rounded-full bg-blue-500 text-white px-3 py-3 transition-colors hover:bg-blue-600 active:bg-blue-600 disabled:bg-gray-200";
