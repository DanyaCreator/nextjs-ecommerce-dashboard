'use client';

import { clsx } from 'clsx';
import { ReactNode, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLockedBody, useOutsideAlerter } from '@/shared/model';

type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  loading?: boolean;
};

export const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  loading,
}: ModalWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useOutsideAlerter(wrapperRef, onClose, loading);
  useLockedBody(isOpen);

  return (
    <div
      className={clsx(
        'w-full h-full bg-black bg-opacity-80',
        'fixed top-0 right-0 z-[90]'
      )}>
      <section
        ref={wrapperRef}
        className={clsx(
          'flex justify-center max-h-[70vh] rounded-2xl bg-white',
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ',
          'p-8'
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
