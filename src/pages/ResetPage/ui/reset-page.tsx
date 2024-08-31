'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton, TextButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
  });

  const watchEmailField = watch('email');

  const onSubmit = (data: z.infer<typeof ResetSchema>) => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    console.log(data);

    startTransition(async () => {
      const result = await reset(data);
      console.log('result: ', result);

      setSuccessMessage(result.success);
      setErrorMessage(result.error);
    });
  };

  return (
    <CardWrapper>
      <form
        className='flex flex-col gap-6 items-center'
        onSubmit={handleSubmit(onSubmit)}>
        <h5 className={`${dmSans.className} text-dark-gray`}>
          Forgot your password?
        </h5>
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
        <div className={'w-full'}>
          {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
          {successMessage && (
            <FormModalMessage successMessage={successMessage} />
          )}
        </div>
        <RoundedButton
          className='mt-16 w-full'
          text={'SEND RESET EMAIL'}
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
