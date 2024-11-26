'use client';

import { useEffect, useState } from 'react';

import { RoundedButton } from '@/shared/ui/buttons';
import { Modal } from './modal';

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
};

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  if (!isMounted) return null;

  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone.'
      isOpen={isOpen}
      onClose={handleClose}>
      <div className='flex mt-16 gap-4 justify-end'>
        <RoundedButton text='Cancel' disabled={loading} onClick={onClose} />
        <RoundedButton
          text='Confirm'
          disabled={loading}
          onClick={onConfirm}
          variant='destructive'
        />
      </div>
    </Modal>
  );
};
