import { auth } from '@/auth';
import { db } from '@/lib';
import { Logo } from '@/shared/ui';
import { Navbar } from './navbar';
import { StoreSwitcher } from './store-switcher';
import { UserButton } from './user-button';

export const Header = async () => {
  const session = await auth();

  const stores = await db.store.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <header className='w-full py-2 bg-white border-b-solid border-b border-dark-gray'>
      <div className='container flex items-center justify-between'>
        <div className='flex items-center'>
          <Logo />
          <Navbar />
        </div>
        <div className='flex gap-8 items-center'>
          <StoreSwitcher items={stores} />
          <UserButton />
        </div>
      </div>
    </header>
  );
};
