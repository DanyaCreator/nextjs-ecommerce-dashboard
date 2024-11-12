import { create } from 'zustand';

interface useModalEntityFormStore {
  isOpen: boolean;
  initialData?: unknown;

  onOpen: (initialData?: unknown) => void;
  onClose: () => void;
}

export const useModalWrapper = create<useModalEntityFormStore>((set) => ({
  isOpen: false,
  initialData: undefined,

  onOpen: (initialData?: unknown) => set({ isOpen: true, initialData }),
  onClose: () => set({ isOpen: false, initialData: undefined }),
}));
