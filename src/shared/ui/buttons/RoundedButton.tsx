import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type RoundedButtonProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const RoundedButton = ({ text, ...props }: RoundedButtonProps) => {
  return (
    <button
      className={clsx(
        'w-full h-8 mt-16 flex justify-center items-center',
        'text-white text-[12px] font-medium tracking-[2.5%]',
        'bg-black rounded border-solid border border-black',
        'hover:bg-white hover:text-black transition-colors'
      )}
      {...props}>
      {text}
    </button>
  );
};
