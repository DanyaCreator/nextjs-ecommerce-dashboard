'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton, TextButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const watchPasswordField = watch('password');

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    console.log(data);

    startTransition(async () => {
      const result = await newPassword(data, token);

      setSuccessMessage(result.success);
      setErrorMessage(result.error);
    });
  };

  return (
    <CardWrapper>
      <form
        className='flex flex-col gap-6 items-center'
        onSubmit={handleSubmit(onSubmit)}>
        <h5 className={`${dmSans.className} text-dark-gray`}>New password</h5>
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
        <div className={'w-full'}>
          {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
          {successMessage && (
            <FormModalMessage successMessage={successMessage} />
          )}
        </div>
        <RoundedButton
          text={'RESET PASSWORD'}
          className='mt-16 w-full'
          type={'submit'}
          disabled={isPending}
        />
        <TextButton
          text={'Back to login'}
          type={'button'}
          disabled={isPending}
          onClick={() => router.push('/auth/login')}
        />
      </form>
    </CardWrapper>
  );
};
