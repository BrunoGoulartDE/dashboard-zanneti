import { cn } from "../../lib/utils";
import { icons } from "lucide-react";
import React from "react";

export type icon = keyof typeof icons;

export interface IconRef extends React.HTMLAttributes<SVGSVGElement> {}

export interface IconProps {
  name: keyof typeof icons;
  className?: string;
}

const Icon = React.forwardRef<IconRef, IconProps>(
  ({ name, className, ...props }, ref) => {
    const LucideIcon = icons[name];

    return (
      <LucideIcon
        className={cn("", className)}
        // @ts-ignore
        ref={ref}
        {...props}
      />
    );
  }
);

export { Icon };
