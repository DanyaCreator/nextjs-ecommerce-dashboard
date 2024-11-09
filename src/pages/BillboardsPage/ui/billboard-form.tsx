'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Product } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useToastStore } from '@/shared/model';
import { EntityFormWrapper, UploadImage } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { SelectField, TextField } from '@/shared/ui/form-fields';
import { BillboardFormSchema } from '../model';

type BillboardFormProps = {
  initialData: Billboard | null;
  products: Product[];
};

export const BillboardForm = ({
  initialData,
  products,
}: BillboardFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof BillboardFormSchema>>({
    resolver: zodResolver(BillboardFormSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
      productId: '',
    },
  });

  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit a billboard' : 'Create a billboard';
  const action = initialData ? 'Save changes' : 'Create billboard';
  const successfully = initialData
    ? 'Billboard was updated!'
    : 'Billboard was created!';

  const formattedProductItems = products.map((p) => ({
    id: p.id,
    value: p.name,
  }));

  useEffect(() => {
    console.log('err: ', errors.imageUrl);
  }, [errors.imageUrl]);

  const onSubmit = (data: z.infer<typeof BillboardFormSchema>) => {
    startTransition(async () => {
      try {
        if (!initialData) {
          await axios.post(`/api/${params?.storeId}/billboards`, data);
        } else {
          await axios.patch(
            `/api/${params?.storeId}/billboards/${params?.billboardId}`,
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
    <EntityFormWrapper title={title} description={description}>
      <form
        className='w-fit flex flex-col gap-6 items-start py-6'
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='imageUrl'
          render={({ field }) => (
            <div>
              <UploadImage
                onChange={(urls) => {
                  console.log('onChange');
                  field.onChange(urls[0]);
                }}
                onRemove={() => field.onChange('')}
                value={field.value ? [field.value] : []}
                disabled={isPending}
                title='Billboard image'
              />
              {errors.imageUrl && (
                <span className='text-red-500'>{errors.imageUrl.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name='label'
          render={({ field }) => (
            <TextField
              label='Label'
              error={errors.label?.message}
              disabled={isPending}
              // defaultValue={initialData?.label}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name='productId'
          render={({ field }) => (
            <SelectField
              items={formattedProductItems}
              unselectedTitle='Select a product'
              emptyListText='There are no one product yet...'
              title='Billboard product'
              error={errors.productId?.message}
              disabled={isPending}
              {...field}
            />
          )}
        />
        <RoundedButton text={action} className='mt-16' type='submit' />
      </form>
    </EntityFormWrapper>
  );
};
