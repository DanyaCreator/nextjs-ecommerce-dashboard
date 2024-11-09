'use client';

import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { RoundedButton } from '@/shared/ui/buttons';

type UploadImageProps = {
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
  title: string;
  disabled?: boolean;
};

export const UploadImage = ({
  disabled,
  onChange,
  onRemove,
  value,
  title,
}: UploadImageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const [activeUrls, setActiveUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!isMounted) return;

    onChange(activeUrls);
  }, [activeUrls]);

  // useEffect(() => {
  //   console.log('value: ', value);
  // }, [value]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event !== 'success' ||
      !result.info ||
      typeof result.info === 'string'
    )
      return;

    console.log('upload images!');

    setActiveUrls([]);
    const url = result.info.secure_url;

    setActiveUrls((prevState) => [...prevState, url]);
  };

  if (!isMounted) return null;

  return (
    <div className='mb-4 flex flex-col items-start gap-4'>
      <span className={`${dmSans.className} text-h5 text-black`}>{title}</span>
      <div className='flex gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='z-10 absolute top-2 right-2'>
              <RoundedButton
                type='button'
                size='icon'
                variant='destructive'
                onClick={() => onRemove(url)}>
                <Trash className='h-4 w-4' color='#fff' />
              </RoundedButton>
            </div>
            <Image fill className='object-cover' src={url} alt='Image' />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={(results) => {
          onUpload(results);
        }}
        uploadPreset='duqla6y4'>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <RoundedButton
              type='button'
              disabled={disabled}
              onClick={onClick}
              onMouseLeave={() => setBtnHovered(false)}
              onMouseEnter={() => setBtnHovered(true)}>
              <ImagePlus
                className='w-4 h-4 mr-2'
                color={btnHovered ? '#000' : '#fff'}
              />
              Upload an image
            </RoundedButton>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export const Test = ({
  onChange,
  value,
}: {
  onChange: (url: string) => void;
  value: string[];
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   console.log('test value: ', value);
  // }, [value]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log('value in test: ', value);
  }, [value]);

  const onUpdate = (url: string) => {
    onChange(url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div>{value.join(', ')}</div>
      <button onClick={() => onUpdate('a')}>click</button>
    </div>
  );
};
