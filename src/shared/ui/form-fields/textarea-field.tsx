import clsx from 'clsx';
import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { FieldError } from '@/shared/ui/errors';

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export const TextareaField = forwardRef(
  (
    { label, error, disabled, className, ...props }: TextareaFieldProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className={clsx('flex flex-col gap-2 w-96', className)}>
        <div className='relative flex flex-col'>
          <textarea
            {...props}
            disabled={disabled}
            ref={ref}
            autoComplete='off'
            className={clsx(
              `outline-none p-2 ${dmSans.className} peer resize-none`,
              'text-h5 text-black border-solid border border-dark-gray rounded-xl',
              'focus:border-black transition',
              !!error && 'border-red-500'
            )}
          />
          <label
            className={clsx(
              'absolute top-2 left-2 pointer-events-none',
              `${dmSans.className} text-h5 text-dark-gray`,
              'transition-all',
              'peer-focus:text-black peer-focus:text-small',
              'peer-focus:translate-y-[-25px] peer-focus:translate-x-[-8px]',
              (props.defaultValue ||
                props.defaultValue === 0 ||
                props.value ||
                props.value === 0) &&
                'text-black text-small translate-y-[-25px] translate-x-[-8px]',
              !!error && 'text-red-500'
            )}>
            {label}
          </label>
        </div>
        {error && <FieldError errorMessage={error} />}
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';
