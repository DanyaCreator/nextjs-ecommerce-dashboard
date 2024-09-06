import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { dmSans } from '@/shared/assets/fonts';

type Variants = 'default' | 'white' | 'destructive';

type RoundedButtonProps = {
  text?: string;
  className?: string;
  variant?: Variants;
  size?: 'default' | 'icon';
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const RoundedButton = ({
  text,
  className,
  variant,
  children,
  size,
  ...props
}: RoundedButtonProps) => {
  return (
    <button
      className={clsx(
        'px-2 flex justify-center items-center',
        (!size || size === 'default') && 'min-w-20 h-8',
        size === 'icon' && 'w-8 h-8',
        `${dmSans.className} text-[12px] font-medium tracking-[2.5%]`,
        'rounded border-solid border border-black transition-colors',
        (!variant || variant === 'default') &&
          'text-white bg-black hover:bg-white hover:text-black',
        className && className,
        variant === 'white' &&
          'text-black bg-white hover:bg-black hover:text-white',
        variant === 'destructive' &&
          'text-white bg-red-500 border-none hover:bg-red-400'
      )}
      {...props}>
      {text}
      {children}
    </button>
  );
};
