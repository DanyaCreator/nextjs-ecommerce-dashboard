'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import * as z from 'zod';
import { dmSans } from '@/shared/assets/fonts';
import { Logo } from '@/shared/ui';
import { SubmitButton, TextButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
import { FormModalMessage } from '@/shared/ui/modals';
import { login } from '../model';
import { LoginSchema } from '../model';

export const LoginForm = () => {
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
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const watchEmailField = watch('email');
  const watchPasswordField = watch('password');

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    startTransition(async () => {
      const result = await login(data);
      console.log('result: ', result);

      setSuccessMessage(result.success);
      setErrorMessage(result.error);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-5 items-center w-fit p-8 m-auto bg-white rounded-xl shadow-xl'>
      <Logo />
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
      <TextButton text={'Have you forgotten your password?'} />
      <div className={'w-full'}>
        {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
        {successMessage && <FormModalMessage successMessage={successMessage} />}
      </div>
      <div className='flex flex-col gap-6 w-full'>
        <SubmitButton text={'SIGN IN'} />
        <div className='relative w-full h-[1px] bg-black'>
          <span
            className={clsx(
              'absolute top-1/2 left-1/2 px-2 py-1',
              `${dmSans.className} text-h5 text-black bg-white`,
              'translate-x-[-50%] translate-y-[-50%]'
            )}>
            or
          </span>
        </div>
        <TextButton text={'Sign in with Google'} icon={<FcGoogle />} />
      </div>
    </form>
  );
};
