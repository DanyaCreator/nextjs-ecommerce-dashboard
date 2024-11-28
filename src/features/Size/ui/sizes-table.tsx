import { DataTable } from '@/shared/ui';
import { SizeColumn, columns } from './columns';

type SizesTableProps = {
  data: SizeColumn[];
};

export const SizesTable = ({ data }: SizesTableProps) => {
  return <DataTable searchKey='value' columns={columns} data={data} />;
};
