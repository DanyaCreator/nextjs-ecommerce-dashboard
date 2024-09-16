'use client';

import { animated, useTransition } from '@react-spring/web';
import clsx from 'clsx';
import { BiError } from 'react-icons/bi';
import { CiCircleCheck } from 'react-icons/ci';
import { dmSans } from '@/shared/assets/fonts';

type FormModalMessageProps = {
  successMessage?: string;
  errorMessage?: string;
};

export const FormModalMessage = ({
  successMessage,
  errorMessage,
}: FormModalMessageProps) => {
  const transitions = useTransition(null, {
    from: { opacity: 0, transform: 'translateY(-40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
  });

  return transitions((style) => (
    <div className='relative w-full'>
      <animated.div
        style={style}
        className={clsx(
          'absolute flex justify-start items-center w-full h-10 px-2 gap-2',
          `${dmSans.className} text-h5 rounded-lg`,
          successMessage && 'text-green-600 bg-green-200',
          errorMessage && 'text-red-600 bg-red-200'
        )}>
        {successMessage && (
          <CiCircleCheck className='w-6 h-6' fill={'rgb(22 163 74'} />
        )}
        {errorMessage && (
          <BiError className='w-6 h-6' fill={'rgb(220 38 38)'} />
        )}
        {successMessage || errorMessage}
      </animated.div>
    </div>
  ));
};
