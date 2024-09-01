import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { auth } from '@/auth';
import { db } from '@/lib';

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  const store = await db.store.findFirst({
    where: { userId: session?.user.id },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
