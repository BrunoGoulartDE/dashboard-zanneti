import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="flex flex-col min-h-full bg-card  rounded-sm">
      <div className="bg-white shadow-md rounded p-2">{children}</div>
    </div>
  );
}
