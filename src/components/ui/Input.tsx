import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
      <input
        className={`w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all duration-200 text-foreground placeholder:text-muted-2 ${error ? "border-danger" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
      <textarea
        className={`w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all duration-200 resize-y text-foreground placeholder:text-muted-2 ${error ? "border-danger" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className = "", ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-foreground">{label}</label>}
      <select
        className={`w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all duration-200 text-foreground ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
