import clsx from 'clsx';
import { dmSans } from '@/shared/assets/fonts';

type TextInputProps = {
  placeholder: string;
  type: 'text' | 'password';
};

export const TextInput = ({ placeholder, type }: TextInputProps) => {
  return (
    <div className={'relative min-w-96 flex flex-col'}>
      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          `outline-none pb-3 ${dmSans.className}`,
          'text-h5 text-black border-solid border-b border-dark-gray',
          'focus:border-black transition'
        )}
      />
    </div>
  );
};
