'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCurrentUser, useStoreModal } from '@/shared/model/hooks';
import { RoundedButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
import { FormModalMessage, Modal } from '@/shared/ui/modals';
import { createStore } from '../api';
import { ModalStoreSchema } from '../model';

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const user = useCurrentUser();

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
  } = useForm<z.infer<typeof ModalStoreSchema>>({
    resolver: zodResolver(ModalStoreSchema),
  });

  const watchNameField = watch('name');

  const onSubmit = (data: z.infer<typeof ModalStoreSchema>) => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    startTransition(async () => {
      const result = await createStore(data, user?.id);

      setSuccessMessage(result.success);
      setErrorMessage(result.error);

      if (result.error || !result.data) return;

      window.location.assign(`/${result.data.id}`);
    });
  };

  return (
    <Modal
      title='Create store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5 items-center mt-6'>
        <div className='flex flex-col gap-2 w-full'>
          <TextInput
            placeholder='Name'
            type='text'
            notEmpty={!!watchNameField}
            invalid={!!errors.name}
            disabled={isPending}
            {...register('name')}
          />
          {errors.name && <FieldError errorMessage={errors.name.message} />}
        </div>
        <div className={'w-full'}>
          {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
          {successMessage && (
            <FormModalMessage successMessage={successMessage} />
          )}
        </div>
        <div className='flex gap-2 self-end mt-16'>
          <RoundedButton
            disabled={isPending}
            text='Cancel'
            className='w-fit'
            type='button'
            variant='white'
            onClick={storeModal.onClose}
          />
          <RoundedButton
            disabled={isPending}
            text='Continue'
            className='w-fit'
            type='submit'
          />
        </div>
      </form>
    </Modal>
  );
};
