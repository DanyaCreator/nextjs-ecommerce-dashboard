import { allertaStencil } from '@/shared/assets/fonts';

export const Logo = () => {
  return (
    <div>
      <span className={`${allertaStencil.className} text-logo text-accent`}>
        S
      </span>
      <span className={`${allertaStencil.className} text-logo text-black`}>
        HOPPE
      </span>
    </div>
  );
};
