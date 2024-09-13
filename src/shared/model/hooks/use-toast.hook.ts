import { create } from 'zustand';

type ToastStore = {
  isOpen: boolean;
  message: string;
  variant: 'success' | 'error';
  onOpen: (message: string, variant: 'success' | 'error') => void;
  onClose: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  isOpen: false,
  message: '',
  variant: 'success',
  onOpen: (message: string, variant: 'success' | 'error') =>
    set({ isOpen: true, message, variant }),
  onClose: () => set({ isOpen: false }),
}));
