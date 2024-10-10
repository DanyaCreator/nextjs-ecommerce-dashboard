import { EntityHeader } from '@/shared/ui';

type SizeHeaderProps = {
  sizesCount: number;
};

export const SizesHeader = ({ sizesCount }: SizeHeaderProps) => {
  return <EntityHeader entityName='sizes' entityCount={sizesCount} />;
};
