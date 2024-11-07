'use client';

import { Plus } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton } from '@/shared/ui/buttons';
import { Modal } from '@/shared/ui/modals';
import { ModalWrapper } from '@/shared/ui/modals/modal-wrapper';

type EntityHeaderProps = {
  entityName: string;
  entityCount?: number;
  children: ReactNode;
};

export const EntityHeader = ({
  entityName,
  entityCount,
  children,
}: EntityHeaderProps) => {
  const [btnHovered, setBtnHovered] = useState(false);

  const [open, setOpen] = useState(false);

  return (
    <header className='flex justify-between items-center pb-6 border-solid border-b border-light-gray'>
      {open && (
        <ModalWrapper
          title={'Create category'}
          description={'Enter the name of category'}
          isOpen={open}
          onClose={() => setOpen(false)}>
          {children}
        </ModalWrapper>
      )}
      <div>
        <h1 className={`${dmSans.className} capitalize`}>
          {entityName}({entityCount})
        </h1>
        <span className={`${dmSans.className} text-dark-gray`}>
          Manage {entityName} for your store
        </span>
      </div>
      <RoundedButton
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={() => setOpen(true)}>
        <Plus className='mr-2 w-4 h-4' color={btnHovered ? '#000' : '#fff'} />
        Add new
      </RoundedButton>
    </header>
  );
};
