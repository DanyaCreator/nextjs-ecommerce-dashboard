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
  DropdownMenuItem,
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
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='flex gap-4 items-center'>
          <Avatar>
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className='bg-black'>
              <FaUser className='text-white' />
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
        <DropdownMenuItem className='mt-8'>
          <RoundedButton
            text={'Logout'}
            className='w-full'
            onClick={() => logout()}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
