'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { Dropdown } from '@/shared/ui/dropdown';
import { FieldError } from '@/shared/ui/errors';
import { TextInput } from '@/shared/ui/inputs';
import { CategoryFormSchema } from '../model';

type CategoryFormProps = {
  initialData: Category | null;
  billboards: Billboard[];
};

export const CategoryForm = ({
  initialData,
  billboards,
}: CategoryFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isSelectOpened, setIsSelectOpened] = useState(false);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  });

  const watchNameField = watch('name');
  const watchBillboardIdField = watch('billboardId');

  const title = initialData ? 'Edit category' : 'Create category';
  const description = initialData ? 'Edit a category' : 'Create a category';
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
            <h5 className={`${dmSans.className} text-dark-gray`}>Billboard</h5>
            <Dropdown
              isOpenChange={() => setIsSelectOpened((prevState) => !prevState)}
              isOpen={isSelectOpened}
              clickOutside={() => setIsSelectOpened(false)}
              title={
                billboards.find((b) => b.id === watchBillboardIdField)?.label ||
                'Select billboard'
              }
              className={errors.billboardId && 'border-red-500'}>
              <div className='w-full p-2 flex flex-col gap-2'>
                {billboards.map((b) => (
                  <div
                    key={b.id}
                    className='w-full h-10 relative'
                    onClick={() => setIsSelectOpened(false)}>
                    <input
                      type='radio'
                      className='appearance-none absolute w-full h-full rounded-sm bg-white peer hover:bg-light-gray transition-colors cursor-pointer'
                      value={b.id}
                      {...register('billboardId')}
                    />
                    <label
                      className={`${dmSans.className} absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none`}>
                      {b.label}
                    </label>
                    <Check
                      className={clsx(
                        'hidden w-4 h-4 peer-checked:block',
                        'absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none'
                      )}
                    />
                  </div>
                ))}
              </div>
            </Dropdown>
            {errors.billboardId && (
              <FieldError errorMessage={errors.billboardId.message} />
            )}
          </div>
        </div>
        <RoundedButton text={action} className='mt-16' type='submit' />
      </form>
    </section>
  );
};
