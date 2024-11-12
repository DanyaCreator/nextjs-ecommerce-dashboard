'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useModalWrapper, useToastStore } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { CategoryFormSchema } from '../model';

type CategoryFormProps = {
  initialData: Category | null;
  title: string;
  description: string;
};

export const CategoryForm = ({
  initialData,
  title,
  description,
}: CategoryFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  const onClose = useModalWrapper((state) => state.onClose);

  const action = initialData ? 'Save changes' : 'Create category';
  const successfully = initialData
    ? 'Category was updated!'
    : 'Category was created!';

  const onSubmit = (data: z.infer<typeof CategoryFormSchema>) => {
    startTransition(async () => {
      console.log(data);
      try {
        if (!initialData) {
          await axios.post(`/api/${params?.storeId}/categories`, data);
        } else {
          await axios.patch(
            `/api/${params?.storeId}/categories/${initialData.id}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        onClose();

        router.refresh();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          toastStore.onOpen(`${error.response?.status}`, 'error');
        }
      }
    });
  };

  return (
    <form
      className='w-fit flex flex-col items-start'
      onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-5'}>
        <h3 className={`${dmSans.className}`}>{title}</h3>
        <h4 className={`${dmSans.className} text-dark-gray`}>{description}</h4>
      </div>
      <label className='flex flex-col mt-[50px]'>
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <TextField
              label='Name'
              error={errors.name?.message}
              disabled={isPending}
              defaultValue={initialData?.name}
              {...field}
            />
          )}
        />
        <RoundedButton
          text={action}
          disabled={isPending}
          type='submit'
          className={'mt-[30px]'}
        />
      </label>
    </form>
  );
};
