'use client';

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { RoundedButton } from '@/shared/ui/buttons';
import { AlertModal, SimpleModal } from '@/shared/ui/modals';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn';
import { deleteBillboard } from '../api';
import { BillboardColumn } from './columns';

type CellActionsProps = {
  data: BillboardColumn;
};

export const CellActions = ({ data }: CellActionsProps) => {
  const [btnHovered, setBtnHovered] = useState(false);
  const [simpleModalMessage, setSimpleModalMessage] = useState<{
    variant: 'error' | 'success';
    msg: string;
  } | null>(null);

  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const params = useParams();

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description).then(() =>
      setSimpleModalMessage({
        variant: 'success',
        msg: 'Billboard id copied to the clipboard',
      })
    );
  };

  const onDelete = () => {
    startTransition(async () => {
      const result = await deleteBillboard(
        data.id,
        typeof params?.storeId === 'string' ? params?.storeId : undefined
      );

      if (result.error) {
        setSimpleModalMessage({ variant: 'error', msg: result.error });
        return;
      }

      setSimpleModalMessage({
        variant: 'success',
        msg: result.success || 'Successful deleted!',
      });

      setOpen(false);
      router.refresh();
      router.push(`/${params?.storeId}/billboards`);
    });
  };

  return (
    <>
      {simpleModalMessage && (
        <SimpleModal
          variant={simpleModalMessage.variant}
          message={simpleModalMessage.msg}
          onClose={() => setSimpleModalMessage(null)}
        />
      )}
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
            onClick={() => onCopy(data.id)}>
            <Copy className='mr-2 w-4 h-4' />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() =>
              router.push(`/${params?.storeId}/billboards/${data.id}`)
            }>
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
