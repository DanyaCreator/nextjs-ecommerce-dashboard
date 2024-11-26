import { DataTable } from '@/shared/ui';
import { MaterialColumn, columns } from './columns';

type MaterialsTableProps = {
  data: MaterialColumn[];
};

export const MaterialsTable = ({ data }: MaterialsTableProps) => {
  return <DataTable searchKey='value' columns={columns} data={data} />;
};
