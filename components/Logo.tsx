import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {withText ? (
        <Image src="/appito-fa.svg" alt="اپیتو" width={104} height={47} priority className="h-9 w-auto" />
      ) : (
        <Image src="/icon.svg" alt="اپیتو" width={40} height={41} priority className="h-9 w-auto" />
      )}
    </span>
  );
}
