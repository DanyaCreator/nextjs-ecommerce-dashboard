'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Product, Image, Category, Size, Material } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useModalEntityForm, useToastStore } from '@/shared/model';
import { UploadImage } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import {
  CheckboxField,
  SelectField,
  TextareaField,
  TextField,
} from '@/shared/ui/form-fields';
import { ProductFormSchema } from '../model';

type ProductFormProps = {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  sizes: Size[];
  materials: Material[];
  setLoading: (value: boolean) => void;
};

export const ProductForm = ({
  initialData,
  categories,
  sizes,
  materials,
  setLoading,
}: ProductFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();
  const modalOnClose = useModalEntityForm((state) => state.onClose);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
          weight: parseFloat(String(initialData.weight)),
        }
      : {
          name: '',
          images: [],
          price: 0,
          categoryId: '',
          materialId: '',
          sizeId: '',
          weight: 0,
          description: '',
          isFeatured: false,
          isArchived: false,
        },
  });

  const title = initialData ? 'Edit products' : 'Create products';
  const description = initialData ? 'Edit a products' : 'Create a products';
  const action = initialData ? 'Save changes' : 'Create products';
  const successfully = initialData
    ? 'Product was updated!'
    : 'Product was created!';

  const categoriesFormattedItems = categories.map((i) => ({
    id: i.id,
    value: i.name,
  }));
  const sizesFormattedItems = sizes.map((i) => ({
    id: i.id,
    value: i.value.toString(),
  }));
  const materialsFormattedItems = materials.map((i) => ({
    id: i.id,
    value: i.value,
  }));

  const onSubmit = (data: z.infer<typeof ProductFormSchema>) => {
    startTransition(async () => {
      try {
        if (!initialData) {
          await axios.post(`/api/${params?.storeId}/products`, data);
        } else {
          await axios.patch(
            `/api/${params?.storeId}/products/${initialData?.id}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

        modalOnClose();
        router.push(`/${params?.storeId}/products`);
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
    <section className='flex flex-col'>
      <header className='flex items-center justify-between pb-6 border-solid border-b border-light-gray'>
        <div>
          <h1 className={`${dmSans.className}`}>{title}</h1>
          <span className={`${dmSans.className} text-dark-gray`}>
            {description}
          </span>
        </div>
      </header>
      <div className='flex flex-col overflow-auto'>
        <form
          className='w-full pr-2 flex flex-col gap-6 items-start py-6 flex-shrink-0 flex-grow'
          onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='images'
            render={({ field }) => (
              <UploadImage
                onChange={(urls) => {
                  console.log('onChange');
                  const formattedUrls = urls.map((u) => ({ url: u }));
                  field.onChange([...field.value, ...formattedUrls]);
                  console.log('field value: ', field.value);
                }}
                onRemove={(url) =>
                  field.onChange(field.value.filter((i) => i.url !== url))
                }
                value={field.value.map((v) => v.url)}
                disabled={isPending}
                title='Product images'
              />
            )}
          />
          <Controller
            control={control}
            name='name'
            render={({ field }) => (
              <TextField
                label='Product name'
                error={errors.name?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='price'
            render={({ field }) => (
              <TextField
                type='number'
                label='Product price'
                error={errors.price?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='weight'
            render={({ field }) => (
              <TextField
                type='number'
                label='Product weight'
                error={errors.weight?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='description'
            render={({ field }) => (
              <TextareaField
                label='Description'
                error={errors.description?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name='categoryId'
            render={({ field }) => (
              <SelectField
                title='Product category'
                items={categoriesFormattedItems}
                unselectedTitle='Select a category'
                emptyListText='There are now any categories'
                error={errors.categoryId?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='sizeId'
            render={({ field }) => (
              <SelectField
                items={sizesFormattedItems}
                unselectedTitle='Select a size'
                emptyListText='There are no one size!'
                title='Product size'
                error={errors.sizeId?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name='materialId'
            render={({ field }) => (
              <SelectField
                items={materialsFormattedItems}
                unselectedTitle='Select a material'
                emptyListText='There are no one material'
                title='Product material'
                error={errors.materialId?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
          <div className='flex gap-4'>
            <Controller
              control={control}
              name='isFeatured'
              render={({ field }) => (
                <CheckboxField
                  label='Is featured'
                  disabled={isPending}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name='isArchived'
              render={({ field }) => (
                <CheckboxField
                  label='Is archived'
                  disabled={isPending}
                  {...field}
                />
              )}
            />
          </div>
          <RoundedButton
            text={action}
            className='mt-16'
            type='submit'
            disabled={isPending}
          />
        </form>
      </div>
    </section>
  );
};
