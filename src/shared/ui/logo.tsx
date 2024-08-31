import { allertaStencil } from '@/shared/assets/fonts';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={className && className}>
      <span
        className={`${allertaStencil.className} text-logo text-accent-theme`}>
        S
      </span>
      <span className={`${allertaStencil.className} text-logo text-black`}>
        HOPPE
      </span>
    </div>
  );
};
