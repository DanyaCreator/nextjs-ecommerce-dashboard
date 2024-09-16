'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { RoundedButton, TextButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const watchEmailField = watch('email');
  const watchPasswordField = watch('password');

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setErrorMessage(undefined);

    startTransition(async () => {
      const result = await login(data);

      setErrorMessage(result.error);
    });
  };

  return (
    <CardWrapper className='flex flex-col gap-6 items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 items-center'>
        <div className='flex flex-col gap-2'>
          <TextInput
            placeholder={'Email'}
            type={'text'}
            notEmpty={!!watchEmailField}
            invalid={!!errors.email}
            disabled={isPending}
            {...register('email')}
          />
          {errors.email && <FieldError errorMessage={errors.email.message} />}
        </div>
        <div className='flex flex-col gap-2'>
          <TextInput
            placeholder={'Password'}
            type={'password'}
            notEmpty={!!watchPasswordField}
            invalid={!!errors.password}
            disabled={isPending}
            {...register('password')}
          />
          {errors.password && (
            <FieldError errorMessage={errors.password.message} />
          )}
        </div>
        <TextButton
          text={'Have you forgotten your password?'}
          type={'button'}
          onClick={() => router.push('/auth/reset')}
        />
        <div className={'w-full'}>
          {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
        </div>
        <RoundedButton
          text={'SIGN IN'}
          className='mt-16 w-full'
          type={'submit'}
        />
      </form>
    </CardWrapper>
  );
};
