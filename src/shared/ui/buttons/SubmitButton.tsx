import clsx from 'clsx';

type SubmitButtonProps = {
  text: string;
};

export const SubmitButton = ({ text }: SubmitButtonProps) => {
  return (
    <button
      type={'submit'}
      className={clsx(
        'w-full h-8 mt-16 flex justify-center items-center',
        'text-white text-[12px] font-medium tracking-[2.5%]',
        'bg-black rounded border-solid border border-black',
        'hover:bg-white hover:text-black transition-colors'
      )}>
      {text}
    </button>
  );
};
