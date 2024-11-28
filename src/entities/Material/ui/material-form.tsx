'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Material } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useModalEntityForm, useToastStore } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { TextField } from '@/shared/ui/form-fields';
import { MaterialsFormSchema } from '../model';

type MaterialFormProps = {
  initialData: Material | null;
  title: string;
  description: string;
  setLoading: (value: boolean) => void;
};

export const MaterialForm = ({
  initialData,
  title,
  description,
  setLoading,
}: MaterialFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);

  const modalOnClose = useModalEntityForm((state) => state.onClose);

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
            `/api/${params?.storeId}/materials/${initialData.id}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        router.push(`/${params?.storeId}/materials`);
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
