import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import { clsx } from 'clsx';

type CardWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalWrapper = ({
  children,
  title,
  description,
  onClose,
}: CardWrapperProps) => {
  return (
    <div className={'fixed w-[100vw] h-[100vh] top-0 left-0 bg-black'}>
      <section
        className={clsx(
          'w-1/2 h-1/2 bg-white rounded-2xl',
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        )}>
        <h4>{title}</h4>
        <h5>{description}</h5>
        <button onClick={onClose}>
          <IoClose />
        </button>
        {children}
      </section>
    </div>
  );
};
