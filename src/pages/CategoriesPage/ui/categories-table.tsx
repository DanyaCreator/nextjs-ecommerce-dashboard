import { DataTable } from '@/shared/ui';
import { CategoryColumn, columns } from './columns';

type CategoriesTableProps = {
  data: CategoryColumn[];
};

export const CategoriesTable = ({ data }: CategoriesTableProps) => {
  return <DataTable searchKey='name' columns={columns} data={data} />;
};
