'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Material } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useToastStore } from '@/shared/model';
import { EntityFormWrapper } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { MaterialsFormSchema } from '../model';
import { dmSans } from '@/shared/assets/fonts';

type MaterialFormProps = {
  initialData: Material | null;
  title: string;
  description: string;
};

export const MaterialForm = ({ initialData, title, description }: MaterialFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof MaterialsFormSchema>>({
    resolver: zodResolver(MaterialsFormSchema),
    defaultValues: initialData || {
      value: '',
    },
  });

  /* const title = initialData ? 'Edit material' : 'Create material';
   const description = initialData ? 'Edit a material' : 'Create a material';*/

  const action = initialData ? 'Save changes' : 'Create material';
  const successfully = initialData
    ? 'Material was updated!'
    : 'Material was created!';

  const onSubmit = (data: z.infer<typeof MaterialsFormSchema>) => {
    startTransition(async () => {
      try {
        if (!initialData) {
          await axios.post(`/api/${params?.storeId}/materials`, data);
        } else {
          await axios.patch(
            `/api/${params?.storeId}/materials/${params?.materialId}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        router.push(`/${params?.storeId}/materials`);
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
          name='value'
          render={({ field }) => (
            <TextField
              label='Value'
              error={errors.value?.message}
              disabled={isPending}
              defaultValue={initialData?.value}
              {...field}
            />
          )}
        />
        <RoundedButton text={action} className={'mt-[30px]'} type='submit' />
      </label>
    </form>
  );
};
