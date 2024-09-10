'use client';

import { useParams, usePathname } from 'next/navigation';

import { HeaderLink } from '@/shared/ui/links';

export const Navbar = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params?.storeId}`,
      title: 'Overview',
      active: pathname === `/${params?.storeId}`,
    },
    {
      href: `/${params?.storeId}/billboards`,
      title: 'Billboards',
      active: pathname === `/${params?.storeId}/billboards`,
    },
    {
      href: `/${params?.storeId}/settings`,
      title: 'Settings',
      active: pathname === `/${params?.storeId}/settings`,
    },
  ];

  return (
    <nav className='flex gap-8 ml-16'>
      {routes.map((link, i) => (
        <HeaderLink
          key={i}
          href={link.href}
          title={link.title}
          active={link.active}
        />
      ))}
    </nav>
  );
};
