'use client';

import axios, { AxiosError } from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { useModalWrapper, useToastStore } from '@/shared/model';
import { RoundedButton } from '@/shared/ui/buttons';
import { AlertModal } from '@/shared/ui/modals';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn';

type EntityCellActionsProps = {
  entityName: string;
  entityId: string;
  entityEndpoint: string;
  entityInitialData: unknown;
};

export const EntityCellActions = ({
  entityName,
  entityId,
  entityEndpoint,
  entityInitialData,
}: EntityCellActionsProps) => {
  const modalOnOpen = useModalWrapper((state) => state.onOpen);

  const toastStore = useToastStore();

  const [btnHovered, setBtnHovered] = useState(false);

  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const params = useParams();

  const onCopy = (description: string) => {
    navigator.clipboard
      .writeText(description)
      .then(() =>
        toastStore.onOpen(`${entityName} id copied to the clipboard`, 'success')
      );
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        await axios.delete(
          `/api/${params?.storeId}/${entityEndpoint}/${entityId}`
        );

        toastStore.onOpen(`${entityName} was deleted!`, 'success');

        router.refresh();
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          toastStore.onOpen(error.response?.data, 'error');
        }
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={isPending}
        />
        <DropdownMenuTrigger asChild>
          <RoundedButton
            size='icon'
            variant='white'
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}>
            <MoreHorizontal
              className='w-4 h-4 transition'
              color={btnHovered ? '#fff' : '#000'}
            />
          </RoundedButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent title='Actions' align='end'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => onCopy(entityId)}>
            <Copy className='mr-2 w-4 h-4' />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => modalOnOpen(entityInitialData)}>
            <Edit className='mr-2 w-4 h-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setOpen(true)}>
            <Trash className='mr-2 w-4 h-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
