'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Product } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';
import { UploadImage } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { SelectField, TextField } from '@/shared/ui/form-fields';
import { BillboardFormSchema } from '../model';

type BillboardFormProps = {
  initialData: Billboard | null;
  products: Product[];
  title: string;
  description: string;
  setLoading: (value: boolean) => void;
};

export const BillboardForm = ({
  initialData,
  products,
  title,
  description,
  setLoading,
}: BillboardFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

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
    <form
      className='w-fit flex flex-col gap-5 items-start'
      onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex flex-col gap-6 border-b-[1px] w-full pb-5'}>
        <h3 className={`${dmSans.className}`}>{title}</h3>
        <h4 className={`${dmSans.className} text-dark-gray`}>{description}</h4>
      </div>
      <div className='flex flex-col overflow-auto'>
        <fieldset className='flex flex-col pr-2 gap-6'>
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
                  <span className='text-red-500'>
                    {errors.imageUrl.message}
                  </span>
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
                defaultValue={initialData?.label}
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
          <RoundedButton text={action} type='submit' className='w-fit mb-2' />
        </fieldset>
      </div>
    </form>
  );
};
