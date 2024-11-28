import { DataTable } from '@/shared/ui';
import { ProductColumn, columns } from './columns';

type ProductsTableProps = {
  data: ProductColumn[];
};

export const ProductsTable = ({ data }: ProductsTableProps) => {
  return <DataTable searchKey='name' columns={columns} data={data} />;
};
