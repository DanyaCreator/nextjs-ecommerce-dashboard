'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Size } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useToastStore } from '@/shared/model';
import { EntityFormWrapper } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { SelectField, TextField } from '@/shared/ui/form-fields';
import { SizesFormSchema } from '../model';

type SizeFormProps = {
  initialData: Size | null;
  categories: Category[];
};

export const SizeForm = ({ initialData, categories }: SizeFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SizesFormSchema>>({
    resolver: zodResolver(SizesFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          value: parseFloat(String(initialData?.value)),
        }
      : {
          value: 0,
          categoryId: '',
        },
  });

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size' : 'Create a size';
  const action = initialData ? 'Save changes' : 'Create size';
  const successfully = initialData ? 'Size was updated!' : 'Size was created!';

  const unselectedCategoryTitle = 'Select a category';
  // FIXME
  const emptyCategoryListText = 'No category';

  const formattedCategoryItems = categories.map((c) => ({
    id: c.id,
    value: c.name,
  }));

  const onSubmit = (data: z.infer<typeof SizesFormSchema>) => {
    startTransition(async () => {
      try {
        if (!initialData) {
          await axios.post(`/api/${params?.storeId}/sizes`, data);
        } else {
          await axios.patch(
            `/api/${params?.storeId}/sizes/${params?.sizeId}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        router.push(`/${params?.storeId}/sizes`);
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
            name='value'
            render={({ field }) => (
              <TextField
                label='Value'
                error={errors.value?.message}
                disabled={isPending}
                defaultValue={
                  initialData?.value ? parseFloat(String(initialData.value)) : 0
                }
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='categoryId'
            render={({ field }) => (
              <SelectField
                items={formattedCategoryItems}
                unselectedTitle={unselectedCategoryTitle}
                emptyListText={emptyCategoryListText}
                error={errors.categoryId?.message}
                disabled={isPending}
                defaultValue={initialData?.categoryId}
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
