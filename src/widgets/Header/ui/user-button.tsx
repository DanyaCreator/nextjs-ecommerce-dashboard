'use client';

import { FaUser } from 'react-icons/fa';

import { logout } from '@/shared/api';
import { dmSans } from '@/shared/assets/fonts';
import { useCurrentUser } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn';

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className='bg-black'>
            <FaUser fill='white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <div className='flex gap-4 items-center'>
          <Avatar>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className='bg-black'>
              <FaUser fill='white' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-start'>
            <h5 className={`${dmSans.className} text-black font-medium`}>
              {user?.name}
            </h5>
            <h5 className={`${dmSans.className} text-dark-gray`}>
              {user?.email}
            </h5>
          </div>
        </div>
        <RoundedButton
          text={'Logout'}
          className='w-full mt-8'
          onClick={() => logout()}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
