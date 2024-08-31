import clsx from 'clsx';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import { dmSans } from '@/shared/assets/fonts';
type TextInputProps = HTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  type: 'text' | 'password';
  invalid: boolean;
  notEmpty: boolean;
  disabled?: boolean;
};

export const TextInput = forwardRef(
  (
    {
      placeholder,
      type,
      invalid,
      notEmpty,
      disabled,
      ...props
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={'relative min-w-96 flex flex-col'}>
        <input
          {...props}
          type={type}
          disabled={disabled}
          ref={ref}
          className={clsx(
            `outline-none pb-3 ${dmSans.className} peer`,
            'text-h5 text-black border-solid border-b border-dark-gray',
            'focus:border-black transition',
            invalid && 'border-red-500'
          )}
        />
        <label
          className={clsx(
            'absolute bottom-3 pointer-events-none',
            `${dmSans.className} text-h5 text-dark-gray`,
            'transition-all',
            'peer-focus:text-black peer-focus:text-small peer-focus:translate-y-[-25px]',
            notEmpty && 'text-black text-small translate-y-[-25px]'
          )}>
          {placeholder}
        </label>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
