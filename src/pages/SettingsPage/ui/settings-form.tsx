'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useOrigin } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
import { FormModalMessage } from '@/shared/ui/modals';
import { AlertModal } from '@/shared/ui/modals';
import { deleteStore, renameStore } from '../api';
import { SettingsFormSchema } from '../model';
import { ApiAlert } from './api-alert';

type SettingsFormProps = {
  initialData: Store;
};

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);

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
  } = useForm<z.infer<typeof SettingsFormSchema>>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: initialData,
  });

  const watchNameField = watch('name');

  const onSubmit = (data: z.infer<typeof SettingsFormSchema>) => {
    setSuccessMessage('');
    setErrorMessage('');

    startTransition(async () => {
      const result = await renameStore(data, initialData.id);

      setErrorMessage(result.error);

      if (!result.error && result.data) {
        setSuccessMessage(result.success);

        router.refresh();
      }
    });
  };

  const onDelete = () => {
    setSuccessMessage('');
    setErrorMessage('');

    startTransition(async () => {
      const result = await deleteStore(initialData.id);

      setErrorMessage(result.error);

      if (!result.error) {
        setSuccessMessage(result.success);

        router.refresh();
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <section>
        <header className='flex justify-between items-center pb-6 border-solid border-b border-light-gray'>
          <div>
            <h1 className={`${dmSans.className}`}>Settings</h1>
            <span className={`${dmSans.className} text-dark-gray`}>
              Manage store preferences
            </span>
          </div>
          <button
            className={clsx(
              'w-12 h-12 flex bg-red-500 rounded-lg cursor-pointer',
              'hover:bg-red-400 transition-colors'
            )}
            onClick={() => setOpen(true)}>
            <Trash className='m-auto w-6 h-6' color='#fff' />
          </button>
        </header>
        <form
          className='w-fit flex flex-col gap-6 items-start py-6'
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextInput
              placeholder='Name'
              type='text'
              invalid={!!errors.name}
              notEmpty={!!watchNameField}
              disabled={isPending}
              defaultValue={initialData.name}
              {...register('name')}
            />
            {errors.name && <FieldError errorMessage={errors.name.message} />}
          </div>
          <div className='w-full'>
            {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
            {successMessage && (
              <FormModalMessage successMessage={successMessage} />
            )}
          </div>
          <RoundedButton text='Save changes' className='mt-16' type='submit' />
        </form>
      </section>
      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${initialData.id}`}
        variant='public'
      />
    </>
  );
};
