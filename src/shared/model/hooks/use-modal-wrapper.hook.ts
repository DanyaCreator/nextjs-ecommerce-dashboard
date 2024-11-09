import { create } from 'zustand';

interface useModalWrapperStore {
  isOpenNewCategory: boolean;
  isOpenUpdate: boolean;

  onOpenNewCategory: () => void;
  onCloseNewCategory: () => void;

  onOpenUpdate: () => void;
  onCloseUpdate: () => void;
}

export const useModalWrapper = create<useModalWrapperStore>((set) => ({
  isOpenNewCategory: false,
  isOpenUpdate: false,

  onOpenNewCategory: () => set({ isOpenNewCategory: true }),
  onCloseNewCategory: () => set({ isOpenNewCategory: false }),

  onOpenUpdate: () => set({ isOpenUpdate: true }),
  onCloseUpdate: () => set({ isOpenUpdate: false }),
}));
