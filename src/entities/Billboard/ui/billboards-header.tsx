import { EntityHeader } from '@/shared/ui';

type BillboardsHeaderProps = {
  billboardsCount?: number;
};

export const BillboardsHeader = ({
  billboardsCount,
}: BillboardsHeaderProps) => {
  return <EntityHeader entityName='billboards' entityCount={billboardsCount} />;
};
