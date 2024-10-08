'use client';

import { Store } from '@prisma/client';
import clsx from 'clsx';
import { Check, PlusIcon, StoreIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { useStoreModal } from '@/shared/model';
import { Dropdown } from '@/shared/ui/dropdown';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/ui/shadcn';

type StoreSwitcherProps = {
  items: Store[];
};

export const StoreSwitcher = ({ items }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    title: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params?.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { title: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Dropdown
      title={currentStore?.title}
      isOpen={open}
      isOpenChange={() => setOpen((prevState) => !prevState)}
      icon={<StoreIcon />}
      clickOutside={() => setOpen(false)}>
      <Command>
        <CommandList className='overflow-hidden'>
          <CommandInput
            placeholder='Search store...'
            className={clsx(
              `outline-none pb-3 ${dmSans.className}`,
              'text-h5 text-black'
            )}
          />
          <CommandEmpty>No store founded</CommandEmpty>
          <CommandGroup
            heading='Stores'
            className={`${dmSans.className} text-dark-gray h-[90px] overflow-auto scrollbar-thin`}>
            {formattedItems.map((store) => (
              <CommandItem
                className={'text-[14px] flex gap-2 cursor-pointer'}
                key={store.value}
                onSelect={() => onStoreSelect(store)}>
                <StoreIcon className='w-4 h-4' />
                {store.title}
                <Check
                  className={clsx(
                    'w-4 h-4 ml-auto',
                    currentStore?.value === store.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              className='text-[14px] flex gap-2 cursor-pointer'
              onSelect={() => {
                setOpen(false);
                storeModal.onOpen();
              }}>
              <PlusIcon className='w-4 h-4' />
              Create store
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Dropdown>
  );
};
