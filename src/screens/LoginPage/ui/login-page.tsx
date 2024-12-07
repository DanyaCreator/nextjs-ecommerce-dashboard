'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { RoundedButton, TextButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { CardWrapper, FormModalMessage } from '@/shared/ui/modals';
import { login } from '../api';
import { LoginSchema } from '../model';

export const LoginPage = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setErrorMessage(undefined);

    // FIXME Add toast
    startTransition(async () => {
      const result = await login(data);

      if (!result) console.error(result);
      // console.log(data);
      // setErrorMessage(result.error);
    });
  };

  return (
    <CardWrapper className='flex flex-col gap-6 items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 items-center'>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <TextField
              label='Email'
              error={errors.email?.message}
              disabled={isPending}
              className='min-w-full'
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <TextField
              label='Password'
              error={errors.password?.message}
              disabled={isPending}
              type='password'
              {...field}
            />
          )}
        />
        <TextButton
          text='Have you forgotten your password?'
          type='button'
          onClick={() => router.push('/auth/reset')}
        />
        <div className='w-full'>
          {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
        </div>
        <RoundedButton text='SIGN IN' className='mt-16 w-full' type='submit' />
      </form>
    </CardWrapper>
  );
};
