import { animated, useSpring } from '@react-spring/web';
import clsx from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BiError } from 'react-icons/bi';
import { CiCircleCheck } from 'react-icons/ci';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';

type ToastProps = {
  message: string;
  variant: 'success' | 'error';
  isOpen: boolean;
};

export const Toast = () => {
  const toastStore = useToastStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => toastStore.onClose(), 3000);

    return () => clearTimeout(timeoutId);
  });

  return createPortal(
    <SimpleModal
      variant={toastStore.variant}
      message={toastStore.message}
      isOpen={toastStore.isOpen}
    />,
    document.body
  );
};

const SimpleModal = ({ variant, message, isOpen }: ToastProps) => {
  const [{ y }, api] = useSpring(() => ({
    y: 0,
  }));

  useEffect(() => {
    if (!isOpen) api({ y: 0 });
    else api({ y: 48 });
  });

  return (
    <div className='fixed z-[100] -top-10 left-1/2 -translate-x-1/2'>
      <animated.div
        style={{ y }}
        className={clsx(
          'flex justify-center items-center w-fit h-10 px-2 gap-2',
          `${dmSans.className} text-h5 rounded-lg`,
          variant === 'success' && 'text-green-600 bg-green-200',
          variant === 'error' && 'text-red-600 bg-red-200'
        )}>
        {variant === 'success' && (
          <CiCircleCheck className='w-6 h-6' fill={'rgb(22 163 74'} />
        )}
        {variant === 'error' && (
          <BiError className='w-6 h-6' fill={'rgb(220 38 38)'} />
        )}
        {message}
      </animated.div>
    </div>
  );
};
