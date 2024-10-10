import { EntityHeader } from '@/shared/ui';

type MaterialsHeaderProps = {
  materialsCount: number;
};

export const MaterialsHeader = ({ materialsCount }: MaterialsHeaderProps) => {
  return <EntityHeader entityName='materials' entityCount={materialsCount} />;
};
