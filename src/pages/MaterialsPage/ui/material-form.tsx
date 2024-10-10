'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Material } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
import { MaterialsFormSchema } from '../model';

type MaterialFormProps = {
  initialData: Material | null;
};

export const MaterialForm = ({ initialData }: MaterialFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof MaterialsFormSchema>>({
    resolver: zodResolver(MaterialsFormSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const watchNameField = watch('name');
  const watchValueField = watch('value');

  const title = initialData ? 'Edit material' : 'Create material';
  const description = initialData ? 'Edit a material' : 'Create a material';
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

  // FIXME Duplicate code
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
        <div className='flex gap-16'>
          <div>
            <TextInput
              placeholder='Name'
              type='text'
              invalid={!!errors.name}
              notEmpty={!!watchNameField}
              disabled={isPending}
              defaultValue={initialData?.name}
              {...register('name')}
            />
            {errors.name && <FieldError errorMessage={errors.name.message} />}
          </div>
          <div className={'flex flex-col gap-2'}>
            <TextInput
              placeholder='Value'
              type='text'
              invalid={!!errors.value}
              notEmpty={!!watchValueField}
              disabled={isPending}
              defaultValue={initialData?.value}
              {...register('value')}
            />
            {errors.value && <FieldError errorMessage={errors.value.message} />}
          </div>
        </div>
        <RoundedButton text={action} className='mt-16' type='submit' />
      </form>
    </section>
  );
};
