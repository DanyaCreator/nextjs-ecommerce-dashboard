import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { dmSans } from '@/shared/assets/fonts';

type RoundedButtonProps = {
  text: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const RoundedButton = ({
  text,
  className,
  ...props
}: RoundedButtonProps) => {
  return (
    <button
      className={clsx(
        'w-full h-8 flex justify-center items-center',
        `${dmSans.className} text-white text-[12px] font-medium tracking-[2.5%]`,
        'bg-black rounded border-solid border border-black',
        'hover:bg-white hover:text-black transition-colors',
        className && className
      )}
      {...props}>
      {text}
    </button>
  );
};
