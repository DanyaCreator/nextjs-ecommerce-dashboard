import { ReactNode } from 'react';

type CardWrapperProps = {
  children: ReactNode;
};

export const CardWrapper = ({ children }: CardWrapperProps) => {
  return <section>{children}</section>;
};
