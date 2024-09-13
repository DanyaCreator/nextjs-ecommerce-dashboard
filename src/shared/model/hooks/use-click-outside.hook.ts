'use client';

import { RefObject, useEffect } from 'react';

export const useOutsideAlerter = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClose: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref?.current &&
        event.target &&
        !ref?.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
