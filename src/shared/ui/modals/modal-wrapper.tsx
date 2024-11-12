'use client';

import { clsx } from 'clsx';
import { ReactNode, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useOutsideAlerter } from '@/shared/model';

type ModalWrapperProps = {
  children: ReactNode;
  onClose: () => void;
};

export const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useOutsideAlerter(wrapperRef, onClose);

  return (
    <div
      className={
        'w-full h-full bg-black bg-opacity-80 z-[90] fixed top-0 right-0'
      }>
      <section
        ref={wrapperRef}
        className={clsx(
          'w-[400px] max-h-[60vh] bg-white rounded-2xl',
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ',
          'p-8 flex justify-center items-center'
        )}>
        <button
          onClick={onClose}
          className={'absolute right-[5px] top-[5px] p-3'}>
          <IoClose className={'w-[20px] h-[20px]'} />
        </button>
        {children}
      </section>
    </div>
  );
};
