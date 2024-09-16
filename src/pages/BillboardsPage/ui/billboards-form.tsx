'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';
import { UploadImage } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
import { BillboardFormSchema } from '../model';

type BillboardFormProps = {
  initialData: Billboard | null;
};

export const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

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
  const successfully = initialData
    ? 'Billboard was updated!'
    : 'Billboard was created!';

  const onSubmit = (data: z.infer<typeof BillboardFormSchema>) => {
    startTransition(async () => {
      try {
        if (!initialData) {
          await axios.post(`/api/stores/${params?.storeId}/billboards`, data);
        } else {
          await axios.patch(
            `/api/stores/${params?.storeId}/billboards/${params?.billboardId}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        router.push(`/${params?.storeId}/billboards`);
        router.refresh();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          toastStore.onOpen(`${error.response?.data}`, 'error');
        }
      }
    });
  };

  return (
    <section className='overflow-auto h-full pr-2'>
      <header className='flex items-center justify-between pb-6 border-solid border-b border-light-gray'>
        <div>
          <h1 className={`${dmSans.className}`}>{title}</h1>
          <span className={`${dmSans.className} text-dark-gray`}>
            {description}
          </span>
        </div>
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
        <RoundedButton text={action} className='mt-16' type='submit' />
      </form>
    </section>
  );
};
