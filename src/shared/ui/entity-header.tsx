'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton } from '@/shared/ui/buttons';

type EntityHeaderProps = {
  entityName: string;
  entityCount?: number;
};

export const EntityHeader = ({
  entityName,
  entityCount,
}: EntityHeaderProps) => {
  const [btnHovered, setBtnHovered] = useState(false);

  const router = useRouter();
  const params = useParams();

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
      <RoundedButton
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        onClick={() => router.push(`/${params?.storeId}/${entityName}/new`)}>
        <Plus className='mr-2 w-4 h-4' color={btnHovered ? '#000' : '#fff'} />
        Add new
      </RoundedButton>
    </header>
  );
};
