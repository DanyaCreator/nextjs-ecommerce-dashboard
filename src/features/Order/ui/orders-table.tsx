import { DataTable } from '@/shared/ui';
import { OrderColumn, columns } from './columns';

type OrdersTableProps = {
  data: OrderColumn[];
};

export const OrdersTable = ({ data }: OrdersTableProps) => {
  return <DataTable searchKey='label' columns={columns} data={data} />;
};
