import type { ReactNode } from "react";

interface FlexProps {
  children: ReactNode;
  className?: string;
}

const Flex = ({ children, className = "" }: FlexProps) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export default Flex;
