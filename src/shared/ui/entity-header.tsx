'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton } from '@/shared/ui/buttons';

type EntityHeaderProps = {
  entityName: string;
  entityCount?: number;
  onCreate?: () => void;
};

export const EntityHeader = ({
  entityName,
  entityCount,
  onCreate,
}: EntityHeaderProps) => {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <header className='flex justify-between items-center pb-6 border-solid border-b border-light-gray'>
      <div>
        <h1 className={`${dmSans.className} capitalize`}>
          {entityName}({entityCount})
        </h1>
        <span className={`${dmSans.className} text-dark-gray`}>
          Manage {entityName} for your store
        </span>
      </div>
      {!!onCreate && (
        <RoundedButton
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onClick={onCreate}>
          <Plus className='mr-2 w-4 h-4' color={btnHovered ? '#000' : '#fff'} />
          Add new
        </RoundedButton>
      )}
    </header>
  );
};
