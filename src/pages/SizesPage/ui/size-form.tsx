'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Size } from '@prisma/client';
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
import { SizesFormSchema } from '../model';

type SizeFormProps = {
  initialData: Size | null;
};

export const SizeForm = ({ initialData }: SizeFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof SizesFormSchema>>({
    resolver: zodResolver(SizesFormSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const watchNameField = watch('name');
  const watchValueField = watch('value');

  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size' : 'Create a size';
  const action = initialData ? 'Save changes' : 'Create size';
  const successfully = initialData ? 'Size was updated!' : 'Size was created!';

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
