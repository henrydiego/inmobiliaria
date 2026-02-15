import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
}

const variants = {
  primary: "bg-accent hover:bg-accent-light text-white",
  secondary: "bg-surface-2 hover:bg-border text-foreground",
  ghost: "border border-border hover:bg-surface-2 text-foreground",
  danger: "bg-danger hover:bg-red-600 text-white",
}

const sizes = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
}

export default function Button({ variant = "primary", size = "md", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
