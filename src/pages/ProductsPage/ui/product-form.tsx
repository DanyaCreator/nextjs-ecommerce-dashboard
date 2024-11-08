'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Product, Image, Category, Size, Material } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';
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
};

export const ProductForm = ({
  initialData,
  categories,
  sizes,
  materials,
}: ProductFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

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
    console.log(data);
    startTransition(async () => {
      try {
        if (!initialData) {
          await axios.post(`/api/${params?.storeId}/products`, data);
        } else {
          await axios.patch(
            `/api/${params?.storeId}/products/${params?.productId}`,
            data
          );
        }

        toastStore.onOpen(successfully, 'success');

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
        className='w-full flex flex-col gap-6 items-start py-6'
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='images'
          render={({ field }) => (
            <UploadImage
              onChange={(urls) => {
                const formattedUrls = urls.map((u) => ({ url: u }));
                field.onChange([...field.value, ...formattedUrls]);
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
        <div className='flex gap-40 w-full'>
          <div className='flex flex-col gap-6'>
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
          </div>
          <div className='w-full flex justify-between'>
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
          </div>
        </div>

        {/*<div>*/}
        {/*  <TextInput*/}
        {/*    placeholder='Name'*/}
        {/*    type='text'*/}
        {/*    invalid={!!errors.name}*/}
        {/*    notEmpty={!!watchNameField}*/}
        {/*    disabled={isPending}*/}
        {/*    defaultValue={initialData?.name}*/}
        {/*    {...register('name')}*/}
        {/*  />*/}
        {/*  {errors.name && <FieldError errorMessage={errors.name.message} />}*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <TextInput*/}
        {/*    placeholder='Price'*/}
        {/*    type='text'*/}
        {/*    invalid={!!errors.price}*/}
        {/*    notEmpty={!!watchPriceField}*/}
        {/*    disabled={isPending}*/}
        {/*    // FIXME default value type*/}
        {/*    defaultValue={initialData?.price as number | undefined}*/}
        {/*    {...register('price')}*/}
        {/*  />*/}
        {/*  {errors.price && <FieldError errorMessage={errors.price.message} />}*/}
        {/*</div>*/}
        {/*<div className={'flex flex-col gap-2'}>*/}
        {/*  <h5 className={`${dmSans.className} text-dark-gray`}>Category</h5>*/}
        {/*  <Dropdown*/}
        {/*    isOpenChange={() =>*/}
        {/*      setIsCategorySelectOpened((prevState) => !prevState)*/}
        {/*    }*/}
        {/*    isOpen={isCategorySelectOpened}*/}
        {/*    clickOutside={() => setIsCategorySelectOpened(false)}*/}
        {/*    title={*/}
        {/*      categories.find((c) => c.id === watchCategoryIdField)?.name ||*/}
        {/*      'Select category'*/}
        {/*    }*/}
        {/*    className={errors.categoryId && 'border-red-500'}>*/}
        {/*    <div className='w-full p-2 flex flex-col gap-2'>*/}
        {/*      {categories.map((c) => (*/}
        {/*        <div*/}
        {/*          key={c.id}*/}
        {/*          className='w-full h-10 relative'*/}
        {/*          onClick={() => setIsCategorySelectOpened(false)}>*/}
        {/*          <input*/}
        {/*            type='radio'*/}
        {/*            className='appearance-none absolute w-full h-full rounded-sm bg-white peer hover:bg-light-gray transition-colors cursor-pointer'*/}
        {/*            value={c.id}*/}
        {/*            {...register('categoryId')}*/}
        {/*          />*/}
        {/*          <label*/}
        {/*            className={`${dmSans.className} absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none`}>*/}
        {/*            {c.name}*/}
        {/*          </label>*/}
        {/*          <Check*/}
        {/*            className={clsx(*/}
        {/*              'hidden w-4 h-4 peer-checked:block',*/}
        {/*              'absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none'*/}
        {/*            )}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </Dropdown>*/}
        {/*  {errors.categoryId && (*/}
        {/*    <FieldError errorMessage={errors.categoryId.message} />*/}
        {/*  )}*/}
        {/*</div>*/}
        {/*<div className={'flex flex-col gap-2'}>*/}
        {/*  <h5 className={`${dmSans.className} text-dark-gray`}>Size</h5>*/}
        {/*  <Dropdown*/}
        {/*    isOpenChange={() =>*/}
        {/*      setIsSizeSelectOpened((prevState) => !prevState)*/}
        {/*    }*/}
        {/*    isOpen={isSizeSelectOpened}*/}
        {/*    clickOutside={() => setIsSizeSelectOpened(false)}*/}
        {/*    title={*/}
        {/*      sizes.find((s) => s.id === watchSizeIdField)?.name ||*/}
        {/*      'Select size'*/}
        {/*    }*/}
        {/*    className={errors.sizeId && 'border-red-500'}>*/}
        {/*    <div className='w-full p-2 flex flex-col gap-2'>*/}
        {/*      {sizes.length === 0 && (*/}
        {/*        <p>*/}
        {/*          You have not created any categories yet. Click here to create*/}
        {/*          a new category*/}
        {/*        </p>*/}
        {/*      )}*/}
        {/*      {sizes.length !== 0 &&*/}
        {/*        sizes.map((s) => (*/}
        {/*          <div*/}
        {/*            key={s.id}*/}
        {/*            className='w-full h-10 relative'*/}
        {/*            onClick={() => setIsSizeSelectOpened(false)}>*/}
        {/*            <input*/}
        {/*              type='radio'*/}
        {/*              className='appearance-none absolute w-full h-full rounded-sm bg-white peer hover:bg-light-gray transition-colors cursor-pointer'*/}
        {/*              value={s.id}*/}
        {/*              {...register('sizeId')}*/}
        {/*            />*/}
        {/*            <label*/}
        {/*              className={`${dmSans.className} absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none`}>*/}
        {/*              {s.name}*/}
        {/*            </label>*/}
        {/*            <Check*/}
        {/*              className={clsx(*/}
        {/*                'hidden w-4 h-4 peer-checked:block',*/}
        {/*                'absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none'*/}
        {/*              )}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        ))}*/}
        {/*    </div>*/}
        {/*  </Dropdown>*/}
        {/*  {errors.sizeId && <FieldError errorMessage={errors.sizeId.message} />}*/}
        {/*</div>*/}
        <RoundedButton text={action} className='mt-16' type='submit' />
      </form>
    </section>
  );
};
