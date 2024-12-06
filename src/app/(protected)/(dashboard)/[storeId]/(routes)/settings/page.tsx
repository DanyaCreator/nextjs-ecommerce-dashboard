// eslint-disable-next-line import/no-internal-modules
import { SettingsPage } from '@/screens/SettingsPage';

type SettingsPageProps = {
  params: { storeId: string };
};

const Settings = ({ params }: SettingsPageProps) => {
  return <SettingsPage storeId={params.storeId} />;
};

export default Settings;
