import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Container;
