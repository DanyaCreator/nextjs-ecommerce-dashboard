'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Product,
  Image,
  Billboard,
  Category,
  Size,
  Material,
} from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';
import { UploadImage } from '@/shared/ui';
import { RoundedButton } from '@/shared/ui/buttons';
import { ProductFormSchema } from '../model';
import { Dropdown } from '@/shared/ui/dropdown';
import { Check } from 'lucide-react';
import clsx from 'clsx';

type ProductFormProps = {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  billboards: Billboard[];
  categories: Category[];
  sizes: Size[];
  materials: Material[];
};

export const ProductForm = ({
  initialData,
  billboards,
  sizes,
  materials,
  categories,
}: ProductFormProps) => {
  const router = useRouter();
  const params = useParams();

  const toastStore = useToastStore();

  const [isPending, startTransition] = useTransition();

  // TODO Maybe there is more universal
  const [isCategorySelectOpened, setIsCategorySelectOpened] = useState(false);
  const [isSizeSelectOpened, setIsSizeSelectOpened] = useState(false);
  const [isMaterialSelectOpened, setIsMaterialSelectOpened] = useState(false);
  const [isBillboardSelectOpened, setIsBillboardSelectOpened] = useState(false);

  // FIXME props are very big
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
        }
      : {
          name: '',
          images: [],
          price: 0,
          categoryId: '',
          materialId: '',
          sizeId: '',
          billboardId: '',
          isFeatured: false,
          isArchived: false,
        },
  });

  const watchNameField = watch('name');
  const watchImagesField = watch('images');
  const watchPriceField = watch('price');
  const watchCategoryIdField = watch('categoryId');
  const watchMaterialIdField = watch('materialId');
  const watchSizeIdField = watch('sizeId');

  // useEffect(() => {
  //   console.log('watch images field: ', watchImagesField);
  // });

  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? 'Edit a product' : 'Create a product';
  const action = initialData ? 'Save changes' : 'Create product';
  const successfully = initialData
    ? 'Product was updated!'
    : 'Product was created!';

  const onSubmit = (data: z.infer<typeof ProductFormSchema>) => {
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
        className='w-fit flex flex-col gap-6 items-start py-6'
        onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='images'
          defaultValue={initialData?.images}
          render={({ field }) => (
            <UploadImage
              onChange={(url) =>
                field.onChange((prev: { url: string }[]) => [...prev, { url }])
              }
              onRemove={(url) =>
                field.onChange((prev: { url: string }[]) =>
                  prev.filter((cur) => cur.url !== url)
                )
              }
              value={field.value.map((v) => v.url)}
              disabled={isPending}
            />
          )}
        />
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
