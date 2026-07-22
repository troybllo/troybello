import { cn } from "@/lib/cn";

const spaceClass = {
  none: "",
  sm: "py-(--sect-sm)",
  md: "py-(--sect-md)",
  lg: "py-(--sect-lg)",
} as const;

type SectionProps = {
  id?: string;
  space?: keyof typeof spaceClass;
  hairline?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  space = "md",
  hairline = true,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-(--space-inline)",
        spaceClass[space],
        hairline && "border-t border-hairline",
        className,
      )}
    >
      {children}
    </section>
  );
}
