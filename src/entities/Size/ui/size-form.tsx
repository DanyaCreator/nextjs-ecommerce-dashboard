'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, Size } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useModalEntityForm, useToastStore } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { SelectField, TextField } from '@/shared/ui/form-fields';
import { SizesFormSchema } from '../model';

type SizeFormProps = {
  initialData: Size | null;
  categories: Category[];
  title: string;
  description: string;
  setLoading: (value: boolean) => void;
};

export const SizeForm = ({
  initialData,
  categories,
  title,
  description,
  setLoading,
}: SizeFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  const modalOnClose = useModalEntityForm((state) => state.onClose);

  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);

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
            `/api/${params?.storeId}/sizes/${initialData.id}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        router.push(`/${params?.storeId}/sizes`);
        router.refresh();

        modalOnClose();
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
      className='w-fit flex flex-col gap-6 items-start py-6'
      onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-5'}>
        <h3 className={`${dmSans.className}`}>{title}</h3>
        <h4 className={`${dmSans.className} text-dark-gray`}>{description}</h4>
      </div>
      <label className='flex flex-col gap-4 mt-[50px]'>
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
        <RoundedButton
          text={action}
          className='mt-16'
          type='submit'
          disabled={isPending}
        />
      </label>
    </form>
  );
};
