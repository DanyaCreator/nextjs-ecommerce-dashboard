import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { dmSans } from '@/shared/assets/fonts';

type RoundedButtonProps = {
  text: string;
  className?: string;
  white?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const RoundedButton = ({
  text,
  className,
  white,
  ...props
}: RoundedButtonProps) => {
  return (
    <button
      className={clsx(
        'min-w-20 px-2 h-8 flex justify-center items-center',
        `${dmSans.className} text-[12px] font-medium tracking-[2.5%]`,
        'rounded border-solid border border-black transition-colors',
        !white && 'text-white bg-black hover:bg-white hover:text-black',
        className && className,
        white && 'text-black bg-white hover:bg-black hover:text-white'
      )}
      {...props}>
      {text}
    </button>
  );
};
