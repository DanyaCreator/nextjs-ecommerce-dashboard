import { DataTable } from '@/shared/ui';
import { BillboardColumn, columns } from './columns';

type BillboardsTableProps = {
  data: BillboardColumn[];
};

export const BillboardsTable = ({ data }: BillboardsTableProps) => {
  return <DataTable searchKey='label' columns={columns} data={data} />;
};
