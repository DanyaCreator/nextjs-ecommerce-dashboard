import { ReactNode } from 'react';

type CardWrapperProps = {
  children: ReactNode;
};

export const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <section className='w-fit p-8 m-auto bg-white rounded-xl shadow-xl'>
      {children}
    </section>
  );
};
