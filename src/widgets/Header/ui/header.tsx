'use client';

import { usePathname } from 'next/navigation';
import { Logo } from '@/shared/ui';
import { HeaderLink } from '@/shared/ui/links';
import { UserButton } from './user-button';

export const Header = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: '/settings',
      title: 'Settings',
      active: pathname === '/settings',
    },
  ];

  return (
    <header className='w-full py-2 bg-white border-b-solid border-b border-dark-gray'>
      <div className='container flex items-center justify-between'>
        <div className='flex items-center'>
          <Logo />
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
        </div>
        <UserButton />
      </div>
    </header>
  );
};
