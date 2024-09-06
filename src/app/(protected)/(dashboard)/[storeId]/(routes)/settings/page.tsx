import { SettingsPage } from '@/pages/SettingsPage';

type SettingsPageProps = {
  params: { storeId: string };
};

const Settings = ({ params }: SettingsPageProps) => {
  return <SettingsPage storeId={params.storeId} />;
};

export default Settings;
