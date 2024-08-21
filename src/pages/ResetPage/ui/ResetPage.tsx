'use client';

import { useRouter } from 'next/navigation';
import { ResetForm } from '@/widgets/ResetForm';
import { loginBackgroundImage } from '@/shared/assets/img';

export const ResetPage = () => {
  const router = useRouter();

  return (
    <main
      style={{
        backgroundImage: `url("${loginBackgroundImage.src}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className='w-screen h-screen flex justify-center items-center'>
      <ResetForm />
    </main>
  );
};
