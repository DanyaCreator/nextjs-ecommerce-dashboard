'use client';

import { useSpring, animated } from '@react-spring/web';
import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode, useEffect, useRef } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { arrowDown } from '@/shared/assets/icons';
import { useOutsideAlerter } from '@/shared/model';

type DropdownProps = {
  isOpenChange: () => void;
  isOpen: boolean;
  title?: string;
  icon?: ReactNode;
  clickOutside?: () => void;
  children: ReactNode;
};

export const Dropdown = ({
  title,
  icon,
  isOpen,
  isOpenChange,
  clickOutside,
  children,
}: DropdownProps) => {
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  useOutsideAlerter(dropdownMenuRef, clickOutside ? clickOutside : () => {});

  const [{ height }, api] = useSpring(() => ({
    height: 0,
  }));

  useEffect(() => {
    if (!isOpen) api({ height: 0 });
    else api({ height: 170 });
  });

  return (
    <div className={'relative flex flex-col gap-4'} ref={dropdownMenuRef}>
      <div
        className={clsx(
          'w-[260px] h-[52px] px-4 py-3 flex justify-between items-center',
          'border-solid border border-light-gray rounded-s cursor-pointer'
        )}
        onClick={isOpenChange}>
        <div className='flex gap-4 items-center'>
          {icon && icon}
          <span className={dmSans.className}>{title}</span>
        </div>
        <Image
          src={arrowDown}
          alt={'arrow-down'}
          className={clsx(
            'transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </div>
      <animated.div
        style={{ top: 'calc(100% + 10px)', height }}
        className={clsx(
          'absolute left-1/2 translate-x-[-50%] z-50',
          'flex flex-col w-full',
          'shadow-md'
        )}>
        {children}
      </animated.div>
    </div>
  );
};
