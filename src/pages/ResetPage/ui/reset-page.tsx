'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton, TextButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { CardWrapper, FormModalMessage } from '@/shared/ui/modals';
import { reset } from '../api';
import { ResetSchema } from '../model';

export const ResetPage = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
  });

  const onSubmit = (data: z.infer<typeof ResetSchema>) => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    startTransition(async () => {
      const result = await reset(data);

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
          Forgot your password?
        </h5>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <TextField
              label='Email'
              error={errors.email?.message}
              disabled={isPending}
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
          className='mt-16 w-full'
          text='SEND RESET EMAIL'
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
