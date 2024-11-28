import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { db } from '@/lib';
import { Header } from '@/widgets/Header';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const store = await db.store.findUnique({
    where: { id: params.storeId },
  });

  if (!store) redirect('/');

  return (
    <div className='flex flex-col w-full'>
      <Header />
      {children}
    </div>
  );
}
