import { cn } from "@/lib/utils";

export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand via-brand-2 to-accent glow">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 18.5V8.5a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v10"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M6 13.5h8"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="17.5" cy="7" r="2.4" fill="white" />
        </svg>
      </span>
      {withText && (
        <span className="text-xl font-extrabold tracking-tight">
          اپیتو
        </span>
      )}
    </span>
  );
}
