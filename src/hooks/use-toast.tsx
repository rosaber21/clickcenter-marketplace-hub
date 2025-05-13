
import { toast as sonnerToast, type ToastT } from "sonner";

export interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
}

export interface ToastActionElement {
  altText: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function useToast() {
  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    return sonnerToast(title as string, {
      description,
      className: variant === "destructive" ? "destructive" : 
                variant === "success" ? "success" : "",
    });
  };

  return { toast };
}
