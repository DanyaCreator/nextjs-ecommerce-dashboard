'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton, TextButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { CardWrapper, FormModalMessage } from '@/shared/ui/modals';
import { newPassword } from '../api';
import { NewPasswordSchema } from '../model';

export const NewPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    startTransition(async () => {
      const result = await newPassword(data, token);

      setSuccessMessage(result.success);
      setErrorMessage(result.error);
    });
  };

  return (
    <CardWrapper className='flex flex-col items-center'>
      <form
        className='flex flex-col gap-6 items-center'
        onSubmit={handleSubmit(onSubmit)}>
        <h5 className={`${dmSans.className} text-dark-gray`}>
          Create a new password
        </h5>
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <TextField
              label='New password'
              error={errors.password?.message}
              disabled={isPending}
              type='password'
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name='confirmPassword'
          render={({ field }) => (
            <TextField
              label='Confirm password'
              error={errors.confirmPassword?.message}
              disabled={isPending}
              type='password'
              {...field}
            />
          )}
        />
        <div className='w-full'>
          {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
          {successMessage && (
            <FormModalMessage successMessage={successMessage} />
          )}
        </div>
        <RoundedButton
          text='RESET PASSWORD'
          className='mt-16 w-full'
          type='submit'
          disabled={isPending}
        />
        <TextButton
          text='Back to login'
          type='button'
          disabled={isPending}
          onClick={() => router.push('/auth/login')}
        />
      </form>
    </CardWrapper>
  );
};
