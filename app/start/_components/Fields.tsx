import { forwardRef } from "react";

interface FieldWrapperProps {
  icon?: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function FieldWrapper({ icon, label, required, error, children }: FieldWrapperProps) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-foreground">
        {icon && <span className="text-muted">{icon}</span>}
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  ({ hasError, className = "", ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      className={`w-full rounded-xl border bg-bg-soft px-3.5 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:ring-3 focus:ring-brand/15 ${
        hasError ? "border-rose-400 focus:border-rose-400" : "border-line focus:border-brand"
      } ${className}`}
    />
  ),
);
FieldInput.displayName = "FieldInput";
