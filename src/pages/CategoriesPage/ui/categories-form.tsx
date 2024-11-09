'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useToastStore } from '@/shared/model';
import { EntityFormWrapper } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { CategoryFormSchema } from '../model';

type CategoryFormProps = {
  initialData: Category | null;
};

export const CategoryForm = ({ initialData }: CategoryFormProps) => {
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

  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category' : 'Create a category';
  const action = initialData ? 'Save changes' : 'Create category';
  const successfully = initialData
    ? 'Category was updated!'
    : 'Category was created!';

  const onSubmit = (data: z.infer<typeof CategoryFormSchema>) => {
    startTransition(async () => {
      try {
        if (!initialData) {
          await axios.post(`/api/${params?.storeId}/categories`, data);
        } else {
          await axios.patch(
            `/api/${params?.storeId}/categories/${params?.categoryId}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        router.push(`/${params?.storeId}/categories`);
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
    <EntityFormWrapper title={title} description={description}>
      <form
        className='w-fit flex flex-col gap-6 items-start py-6'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-16'>
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
        </div>
        <RoundedButton text={action} className='mt-16' type='submit' />
      </form>
    </EntityFormWrapper>
  );
};
