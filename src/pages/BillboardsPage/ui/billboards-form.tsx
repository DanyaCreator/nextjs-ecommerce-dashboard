'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { UploadImage } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
import { AlertModal, FormModalMessage } from '@/shared/ui/modals';
import { createBillboard, deleteBillboard, updateBillboard } from '../api';
import { BillboardFormSchema } from '../model';

type BillboardFormProps = {
  initialData: Billboard | null;
  storeId?: string;
};

// TODO Add custom scrollbar & ui improvements
export const BillboardForm = ({ initialData, storeId }: BillboardFormProps) => {
  const router = useRouter();
  const params = useParams();

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
    control,
    formState: { errors },
  } = useForm<z.infer<typeof BillboardFormSchema>>({
    resolver: zodResolver(BillboardFormSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  const watchLabelField = watch('label');

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit a billboard' : 'Create a billboard';
  const action = initialData ? 'Save changes' : 'Create billboard';

  const onSubmit = (data: z.infer<typeof BillboardFormSchema>) => {
    setSuccessMessage('');
    setErrorMessage('');

    startTransition(async () => {
      let result;
      if (initialData) {
        result = await updateBillboard(data, storeId, initialData.id);
      } else {
        result = await createBillboard(data, storeId);
      }

      setErrorMessage(result.error);

      if (!result.error) {
        setSuccessMessage(result.success);

        router.refresh();
        router.push(`/${params?.storeId}/billboards`);
      }
    });
  };

  const onDelete = () => {
    setSuccessMessage('');
    setErrorMessage('');

    startTransition(async () => {
      const result = await deleteBillboard(initialData?.id, storeId);

      setErrorMessage(result.error);

      if (!result.error) {
        setSuccessMessage(result.success);

        router.refresh();
        router.push(`/${params?.storeId}/billboards`);
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
      <section className='overflow-auto h-full'>
        <header className='flex items-center justify-between pb-6 border-solid border-b border-light-gray'>
          <div>
            <h1 className={`${dmSans.className}`}>{title}</h1>
            <span className={`${dmSans.className} text-dark-gray`}>
              {description}
            </span>
          </div>
          {initialData && (
            <button
              className={clsx(
                'w-12 h-12 flex bg-red-500 rounded-lg cursor-pointer',
                'hover:bg-red-400 transition-colors'
              )}
              onClick={() => setOpen(true)}>
              <Trash className='m-auto w-6 h-6' color='#fff' />
            </button>
          )}
        </header>
        <form
          className='w-fit flex flex-col gap-6 items-start py-6'
          onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='imageUrl'
            render={({ field }) => (
              <UploadImage
                onChange={(url) => field.onChange(url)}
                onRemove={() => field.onChange('')}
                value={field.value ? [field.value] : []}
                disabled={isPending}
              />
            )}
          />
          <div>
            <TextInput
              placeholder='Label'
              type='text'
              invalid={!!errors.label}
              notEmpty={!!watchLabelField}
              disabled={isPending}
              defaultValue={initialData?.label}
              {...register('label')}
            />
            {errors.label && <FieldError errorMessage={errors.label.message} />}
          </div>
          <div className='w-full'>
            {errorMessage && <FormModalMessage errorMessage={errorMessage} />}
            {successMessage && (
              <FormModalMessage successMessage={successMessage} />
            )}
          </div>
          <RoundedButton text={action} className='mt-16' type='submit' />
        </form>
      </section>
    </>
  );
};
