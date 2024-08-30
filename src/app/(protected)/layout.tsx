import { ReactNode } from 'react';
import { Header } from '@/widgets/Header';

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className='flex flex-col w-full'>
      <Header />
      {children}
    </div>
  );
}
