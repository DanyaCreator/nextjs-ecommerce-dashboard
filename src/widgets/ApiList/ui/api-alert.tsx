'use client';

import { Copy, Server } from 'lucide-react';
import { useState } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { useToastStore } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { Alert, AlertDescription, AlertTitle, Badge } from '@/shared/ui/shadcn';

type Variant =
  | 'secondary'
  | 'destructive'
  | 'default'
  | 'outline'
  | null
  | undefined;

type ApiAlertProps = {
  title: string;
  description: string;
  variant: 'public' | 'admin';
};

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], Variant> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert = ({ title, description, variant }: ApiAlertProps) => {
  const toastStore = useToastStore();

  const [copyBtnHovered, setCopyBtnHovered] = useState(false);

  const onCopy = (description: string) => {
    navigator.clipboard
      .writeText(description)
      .then(() =>
        toastStore.onOpen('API Route copied to the clipboard', 'success')
      );
  };

  return (
    <section className='py-4'>
      <Alert>
        <Server className='h-4 w-4' />
        <AlertTitle className={`${dmSans.className} flex items-center gap-2`}>
          {title}
          <Badge variant={variantMap[variant]} className={dmSans.className}>
            {textMap[variant]}
          </Badge>
        </AlertTitle>
        <AlertDescription
          className={`${dmSans.className} flex justify-between items-center`}>
          <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
            {description}
          </code>
          <RoundedButton
            variant='white'
            size='icon'
            className='peer'
            onClick={() => onCopy(description)}
            onMouseEnter={() => setCopyBtnHovered(true)}
            onMouseLeave={() => setCopyBtnHovered(false)}>
            <Copy
              className='h-4 w-4'
              style={{
                filter: copyBtnHovered
                  ? 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(211deg) brightness(105%) contrast(104%)'
                  : '',
              }}
            />
          </RoundedButton>
        </AlertDescription>
      </Alert>
    </section>
  );
};
