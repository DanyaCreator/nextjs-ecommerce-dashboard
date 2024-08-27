'use client';

import { useRouter } from 'next/navigation';
import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton } from '@/shared/ui/buttons';
import { CardWrapper } from '@/shared/ui/modals';

export const AuthErrorPage = () => {
  const router = useRouter();

  return (
    <CardWrapper>
      <div className='flex flex-col gap-16 items-center'>
        <div className='flex flex-col gap-6 items-center'>
          <h1 className={`${dmSans.className}`}>Oops...</h1>
          <h3 className={`${dmSans.className} text-dark-gray`}>
            Something went wrong! Please try login again.
          </h3>
        </div>
        <RoundedButton
          text={'Go back'}
          onClick={() => router.push('/auth/login')}
        />
      </div>
    </CardWrapper>
  );
};
