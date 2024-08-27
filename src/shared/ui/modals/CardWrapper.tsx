import clsx from 'clsx';
import { ReactNode } from 'react';

type CardWrapperProps = {
  children: ReactNode;
  className?: string;
};

export const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return (
    <section
      className={clsx(
        'w-fit p-8 m-auto bg-white rounded-xl shadow-xl',
        className
      )}>
      {children}
    </section>
  );
};
