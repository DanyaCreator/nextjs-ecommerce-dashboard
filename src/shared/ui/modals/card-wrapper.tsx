import clsx from 'clsx';
import { ReactNode } from 'react';

import { Logo } from '../logo';

type CardWrapperProps = {
  children: ReactNode;
  className?: string;
};

export const CardWrapper = ({ children, className }: CardWrapperProps) => {
  return (
    <section
      className={clsx(
        'w-[500px] p-8 m-auto bg-white rounded-xl shadow-xl',
        className
      )}>
      <Logo className='w-full text-center' />
      {children}
    </section>
  );
};
