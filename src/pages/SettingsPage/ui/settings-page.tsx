import { redirect } from 'next/navigation';

import { getStoreById } from '@/shared/model';
import { SettingsForm } from './settings-form';

type SettingsPageProps = {
  storeId: string;
};

export const SettingsPage = async ({ storeId }: SettingsPageProps) => {
  const store = await getStoreById(storeId);

  if (!store) redirect('/');

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-auto'>
      <SettingsForm initialData={store} />
    </main>
  );
};
