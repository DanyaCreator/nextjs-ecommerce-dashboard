'use client';

import clsx from 'clsx';
import { Check } from 'lucide-react';
import { ForwardedRef, forwardRef, InputHTMLAttributes, useState } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { Dropdown } from '@/shared/ui/dropdown';
import { FieldError } from '@/shared/ui/errors';

type SelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  items: Item[];
  unselectedTitle: string;
  emptyListText: string;
  title?: string;
  error?: string;
  disabled?: boolean;
};

type Item = {
  id: string;
  value: string;
};

export const SelectField = forwardRef(
  (
    {
      items,
      unselectedTitle,
      emptyListText,
      error,
      disabled,
      title,
      ...props
    }: SelectFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentTitle =
      typeof props.defaultValue === 'string'
        ? props.defaultValue
        : unselectedTitle;

    return (
      <div className='flex flex-col gap-2'>
        <h5 className={dmSans.className}>{title}</h5>
        <Dropdown
          isOpenChange={() => setIsOpen((prevState) => !prevState)}
          isOpen={isOpen}
          clickOutside={() => setIsOpen(false)}
          title={items.find((i) => i.id === props.value)?.value || currentTitle}
          className={error && 'border-red-500'}
          disabled={disabled}>
          <div className='w-full p-2 flex flex-col gap-2'>
            {items.length === 0 && (
              <p className={dmSans.className}>{emptyListText}</p>
            )}
            {items.length !== 0 &&
              items.map((i) => (
                <div
                  key={i.id}
                  className='w-full h-10 relative'
                  onClick={() => setIsOpen(false)}>
                  <input
                    {...props}
                    type='radio'
                    className={clsx(
                      'appearance-none absolute w-full h-full rounded-sm bg-white peer',
                      'hover:bg-light-gray transition-colors cursor-pointer'
                    )}
                    value={i.id}
                    ref={ref}
                  />
                  <label
                    className={clsx(
                      `${dmSans.className} absolute top-1/2 left-1`,
                      '-translate-y-1/2 pointer-events-none'
                    )}>
                    {i.value}
                  </label>
                  <Check
                    className={clsx(
                      'hidden w-4 h-4 peer-checked:block',
                      'absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none'
                    )}
                  />
                </div>
              ))}
          </div>
        </Dropdown>
        {error && <FieldError errorMessage={error} />}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

// {/*      sizes.find((s) => s.id === watchSizeIdField)?.name ||*/}
