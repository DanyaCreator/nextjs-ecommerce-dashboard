import clsx from 'clsx';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import { dmSans } from '@/shared/assets/fonts';

type CheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value'
> & {
  label: string;
  disabled?: boolean;
  value?: boolean;
};

export const CheckboxField = forwardRef(
  (
    { label, disabled, value, ...props }: CheckboxFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label
        className={clsx(
          'relative flex group pl-[20px] h-[16px] items-center',
          `${dmSans.className} text-black text-h5`,
          'cursor-pointer'
        )}>
        {label}
        <input
          {...props}
          type='checkbox'
          checked={value}
          ref={ref}
          disabled={disabled}
          className={clsx(
            'absolute top-0 left-0 w-[16px] h-[16px] appearance-none outline-none',
            'peer'
          )}
        />
        <span
          className={clsx(
            'absolute top-0 left-0 w-[16px] h-[16px]',
            'bg-white border-solid border border-black rounded-sm',
            'group-hover:border-dark-gray',
            'transition-colors',
            "after:content-['_'] after:absolute after:hidden",
            'after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2',
            'after:w-[5px] after:h-[10px]',
            'after:border-white after:border-b-[3px] after:border-r-[3px] after:border-solid',
            'after:rotate-45 peer-checked:after:block',
            'peer-checked:bg-black'
          )}
        />
      </label>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';
