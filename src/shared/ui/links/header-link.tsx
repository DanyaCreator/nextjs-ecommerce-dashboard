import clsx from 'clsx';
import { dmSans } from '@/shared/assets/fonts';

type HeaderLinkProps = {
  href: string;
  title: string;
  active?: boolean;
};

export const HeaderLink = ({ href, title, active }: HeaderLinkProps) => {
  return (
    <a
      href={href}
      className={clsx(
        `${dmSans.className} text-[16px] text-dark-gray transition`,
        'hover:text-black',
        active && 'text-black'
      )}>
      {title}
    </a>
  );
};
