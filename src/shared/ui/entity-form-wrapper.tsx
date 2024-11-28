import clsx from 'clsx';
import { ReactNode } from 'react';

import { dmSans } from '@/shared/assets/fonts';

type EntityFormWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const EntityFormWrapper = ({
  title,
  description,
  children,
}: EntityFormWrapperProps) => {
  return (
    <section className='overflow-auto h-full pr-2'>
      <header
        className={clsx(
          'flex items-center justify-between pb-6',
          'border-solid border-b border-light-gray'
        )}>
        <div>
          <h1 className={`${dmSans.className}`}>{title}</h1>
          <span className={`${dmSans.className} text-dark-gray`}>
            {description}
          </span>
        </div>
      </header>
      {children}
    </section>
  );
};
