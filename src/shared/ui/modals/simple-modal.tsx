'use client';

import { useTransition, animated } from '@react-spring/web';
import clsx from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BiError } from 'react-icons/bi';
import { CiCircleCheck } from 'react-icons/ci';

import { dmSans } from '@/shared/assets/fonts';

type SimpleModal = {
  variant: 'success' | 'error';
  message: string;
  onClose: () => void;
};

export const SimpleModal = ({ variant, message, onClose }: SimpleModal) => {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const transitions = useTransition(null, {
    from: { opacity: 0, transform: 'translateY(-40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-40px)' },
  });

  return message
    ? transitions((style) =>
        createPortal(
          <div className='fixed top-2 left-1/2 -translate-x-1/2'>
            <animated.div
              style={style}
              className={clsx(
                'flex justify-center items-center w-fit h-10 px-2 gap-2',
                `${dmSans.className} text-h5 rounded-lg`,
                variant === 'success' && 'text-green-600 bg-green-200',
                variant === 'error' && 'text-red-600 bg-red-200'
              )}>
              {variant === 'success' && <CiCircleCheck className='w-6 h-6' />}
              {variant === 'error' && <BiError className='w-6 h-6' />}
              {message}
            </animated.div>
          </div>,
          document.body
        )
      )
    : null;
};
