'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/shared/model';

export const SetupPage = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (isOpen) return;

    onOpen();
  }, [isOpen, onOpen]);

  return <div>Root page</div>;
};
