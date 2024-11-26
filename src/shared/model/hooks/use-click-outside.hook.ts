'use client';

import { RefObject, useEffect } from 'react';

export const useOutsideAlerter = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClose: () => void,
  disabled?: boolean
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref?.current &&
        event.target &&
        !ref?.current.contains(event.target as Node) &&
        !disabled
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, disabled]);
};
