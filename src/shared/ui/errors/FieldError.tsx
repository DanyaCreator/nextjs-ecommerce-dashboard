import { dmSans } from '@/shared/assets/fonts';

type FieldErrorProps = {
  errorMessage?: string;
};

export const FieldError = ({ errorMessage }: FieldErrorProps) => {
  return (
    <span className={`w-full ${dmSans.className} text-red-500`}>
      {errorMessage}
    </span>
  );
};
