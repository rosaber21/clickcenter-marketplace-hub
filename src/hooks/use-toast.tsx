
import * as React from "react"
import { toast as sonnerToast } from "sonner"

type ToastProps = React.ComponentProps<typeof sonnerToast> & {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success"
}

export function toast(props: ToastProps) {
  const { title, description, variant, ...rest } = props
  
  return sonnerToast[variant === "destructive" ? "error" : variant === "success" ? "success" : "default"](title, {
    description,
    ...rest,
  })
}

export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}

