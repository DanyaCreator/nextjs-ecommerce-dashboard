'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useStoreModal } from '@/shared/model/hooks';
import { RoundedButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { FormModalMessage, Modal } from '@/shared/ui/modals';
import { ModalStoreSchema } from '../model';

export const StoreModal = () => {
  const storeModal = useStoreModal();

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
  } = useForm<z.infer<typeof ModalStoreSchema>>({
    resolver: zodResolver(ModalStoreSchema),
  });

  const onSubmit = (data: z.infer<typeof ModalStoreSchema>) => {
    setSuccessMessage(undefined);
    setErrorMessage(undefined);

    startTransition(async () => {
      try {
        const result = await axios.post('/api/stores', data);

        setSuccessMessage('Store is created successfully!');
        window.location.assign(`/${result.data.id}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data);
        }
      }
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
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <TextField
              label='Name'
              error={errors.name?.message}
              disabled={isPending}
              {...field}
            />
          )}
        />
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
