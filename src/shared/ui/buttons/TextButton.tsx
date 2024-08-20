import { HTMLAttributes, ReactNode } from 'react';
import { dmSans } from '@/shared/assets/fonts';

type TextButtonProps = {
  text: string;
  icon?: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export const TextButton = ({ text, icon, ...props }: TextButtonProps) => {
  return (
    <div className='flex gap-2 items-center justify-center w-full'>
      {icon}
      <button
        className={`${dmSans.className} text-h5 text-black hover:text-dark-gray transition-colors`}
        {...props}>
        {text}
      </button>
    </div>
  );
};
