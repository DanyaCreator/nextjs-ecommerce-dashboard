import { ReactNode } from 'react';

import { dmSans } from '@/shared/assets/fonts';
import { Logo } from '@/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn';

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent>
        <Logo className='w-full text-center' />
        <DialogHeader>
          <DialogTitle className={dmSans.className}>{title}</DialogTitle>
          <DialogDescription className={dmSans.className}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
