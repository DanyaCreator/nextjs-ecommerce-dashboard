'use client';

import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-internal-modules
import { StoreModal } from '@/screens/SetupPage';
import { Toast } from '@/shared/ui/modals';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
      <Toast />
    </>
  );
};
