import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image src="/logo.svg" alt="اپیتو" width={40} height={50} priority className="h-9 w-auto" />
      {withText && <Image src="/appito-fa.svg" alt="اپیتو" width={104} height={47} priority className="h-6 w-auto" />}
    </span>
  );
}
