import { ReactNode } from 'react';
import { dmSans } from '@/shared/assets/fonts';

type TextButtonProps = {
  text: string;
  icon?: ReactNode;
};

export const TextButton = ({ text, icon }: TextButtonProps) => {
  return (
    <div className='flex gap-2 items-center justify-center w-full'>
      {icon}
      <button
        className={`${dmSans.className} text-h5 text-black hover:text-dark-gray transition-colors`}>
        {text}
      </button>
    </div>
  );
};
